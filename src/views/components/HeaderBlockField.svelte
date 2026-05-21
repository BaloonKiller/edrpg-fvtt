<script>
   import { localize } from "@typhonjs-fvtt/runtime/svelte/helper";
   import { safeAccess } from "#runtime/util/object";
   import { bindDocument } from "../utils.js";

   export let document;
   export let field;
   export let readonly = false;
   export let max = null;
   export let direction;
   export let borderColor = "border";
   export let titleColor;
   export let contentColor;

   $: value = safeAccess($document.system, field);
</script>

<label>
   <div
      class="bg-gradient-to-r from-{titleColor.start} to-{titleColor.end} p-1 text-{direction} text-white text-xs
             font-bold uppercase font-expanded clip-path-header-block-{direction}-title"
   >
      {localize(`EDRPG.sheet.${field}`)}
   </div>
   {#if readonly}
      <input
         type="text"
         readonly
         {value}
         class="bg-gradient-to-r from-{contentColor.start} to-{contentColor.end} border-0 h-12 text-center
                clip-path-header-block-{direction}-content"
      />
   {:else}
      <div
         class="bg-gradient-to-r from-{contentColor.start} to-{contentColor.end} flex justify-center items-center h-12
                clip-path-header-block-{direction}-content"
      >
         <input
            type="number"
            use:bindDocument={{ document, path: `system.${field}.value` }}
            {max}
            min="0"
            step="1"
            class="bg-transparent border-{borderColor} w-10 text-center"
         />
         / {max}
      </div>
   {/if}
</label>
