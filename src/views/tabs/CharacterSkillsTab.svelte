<script>
   import { localize } from "#runtime/svelte/helper";
   import { bindDocument } from "../utils.js";

   export let document;
</script>

<div class="grid grid-cols-2 gap-4">
   {#each Object.entries($document.system.skills) as [category, skills]}
      <div>
         <h2
            class="bg-gradient-to-r from-section-begin to-section-end px-1.5 text-white text-base uppercase font-expanded
                   [clip-path:polygon(0_0,50%_0,55%_66.7%,97.5%_66.7%,100%_100%,0_100%)]"
         >
            {localize(category)}
         </h2>
         <table class="bg-transparent m-0 border-separate border-spacing-1">
            <thead>
               <tr>
                  <th
                     class="bg-table-header pl-0 pr-1.5 py-1 text-white text-right [text-shadow:none] font-bold uppercase"
                  >
                     {localize("EDRPG.sheet.table.skills.skill")}
                  </th>
                  <th class="bg-table-header px-0 py-1 text-white [text-shadow:none] font-bold uppercase">
                     {localize("EDRPG.sheet.table.skills.base")}
                  </th>
                  <th class="bg-table-header px-0 py-1 text-white [text-shadow:none] font-bold uppercase">
                     {localize("EDRPG.sheet.table.skills.learning")}
                  </th>
                  <th class="bg-table-header px-0 py-1 text-white [text-shadow:none] font-bold uppercase">
                     {localize("EDRPG.sheet.table.skills.bonus")}
                  </th>
                  <th class="bg-table-check px-0 py-1 text-white [text-shadow:none] font-bold uppercase">&check;</th>
               </tr>
            </thead>
            <tbody>
               {#each Object.keys(skills) as skill}
                  <tr>
                     <th
                        class="bg-gradient-to-r from-white to-table-name px-1.5 py-0 text-right font-medium font-condensed"
                     >
                        <span>{localize(`EDRPG.sheet.skills.${category}.${skill}.name`)}</span>
                     </th>
                     <td class="bg-table-cell border-border p-0 w-16 text-center">
                        <input
                           type="number"
                           readonly
                           value={$document.system.skills[category][skill].min}
                           class="bg-transparent w-full h-full"
                        />
                     </td>
                     <td class="bg-table-cell border-border p-0 w-16 text-center">
                        <input
                           type="number"
                           class="bg-transparent w-full h-full"
                           use:bindDocument={{ document, path: `system.skills.${category}.${skill}.learning` }}
                           min="0"
                        />
                     </td>
                     <td class="bg-table-cell border-border p-0 w-16 text-center">
                        <input
                           type="number"
                           readonly
                           value={$document.system.skills[category][skill].bonus}
                           class="bg-transparent w-full h-full"
                        />
                     </td>
                     <td class="bg-table-highlight border border-table-highlight-border p-0 w-16 text-center">
                        {#if $document.system.skills[category][skill].used}
                           <i class="far fa-check-square"></i>
                        {:else}
                           <i class="far fa-square"></i>
                        {/if}
                     </td>
                  </tr>
               {/each}
            </tbody>
         </table>
      </div>
   {/each}
</div>
