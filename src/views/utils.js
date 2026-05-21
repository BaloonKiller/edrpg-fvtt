import { safeAccess } from "#runtime/util/object";

/**
 * Bind a form element to a Foundry document update path.
 *
 * @param {HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement} element Form element to bind.
 *
 * @param {object} options Binding options.
 *
 * @param {import('#runtime/svelte/store/fvtt/document').TJSDocument} options.document Target document store.
 *
 * @param {string} options.path Foundry update path.
 *
 * @returns {import('svelte/action').ActionReturn} Svelte action lifecycle.
 */
export function bindDocument(element, { document, path }) {
   const key = element.type === "checkbox" ? "checked" : "value";
   let value;

   const unsubscribe = document.subscribe((doc) => {
      const newValue = safeAccess(doc, path);
      if (value !== newValue && newValue !== "") {
         value = newValue;
         element[key] = value;
      }
   });

   /**
    * Update the document after the input value changes.
    *
    * @param {Event} event Change event.
    */
   function onChange(event) {
      let newValue = event.target[key];
      if (element.type === "number") {
         newValue = Number(newValue);
      }
      document.get().update({ [path]: newValue });
   }

   element.addEventListener("change", onChange);
   return {
      destroy: () => {
         element.removeEventListener("change", onChange);
         unsubscribe();
      },
   };
}
