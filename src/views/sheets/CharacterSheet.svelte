<svelte:options accessors={true} />

<script>
   import { localize } from "#runtime/svelte/helper";

   import SheetImage from "../components/SheetImage.svelte";
   import NameField from "../components/NameField.svelte";
   import CharacterDetailField from "../components/CharacterDetailField.svelte";
   import RankField from "../components/RankField.svelte";
   import HeaderBlockField from "../components/HeaderBlockField.svelte";

   import CharacterSkillsTab from "../tabs/CharacterSkillsTab.svelte";

   /** @type {import('#runtime/svelte/store/fvtt/document').TJSDocument} */
   export let document;
</script>

<main class="bg-white">
   <header class="grid grid-cols-6 gap-4">
      <div class="row-span-2 w-32">
         <SheetImage {document} />
      </div>
      <div class="col-span-4">
         <NameField {document} />
      </div>
      <div class="row-span-2">
         <RankField {document} />
      </div>
      <CharacterDetailField {document} field="gender" />
      <CharacterDetailField {document} field="age" />
      <CharacterDetailField {document} field="height" />
      <CharacterDetailField {document} field="weight" />
      <HeaderBlockField
         {document}
         field="dodge"
         readonly
         direction="left"
         titleColor={{ start: "section-begin", end: "section-end" }}
         contentColor={{ start: "table-name", end: "white" }}
      />
      <HeaderBlockField
         {document}
         field="initiative"
         readonly
         direction="center"
         titleColor={{ start: "section-begin", end: "section-end" }}
         contentColor={{ start: "table-name", end: "white" }}
      />
      <HeaderBlockField
         {document}
         field="parry"
         readonly
         direction="right"
         titleColor={{ start: "section-end", end: "section-begin" }}
         contentColor={{ start: "table-name", end: "white" }}
      />
      <HeaderBlockField
         {document}
         field="karma.standard"
         max={$document.system.rank.karmaPoints}
         direction="left"
         borderColor="karma-table"
         titleColor={{ start: "karma-begin", end: "karma-end" }}
         contentColor={{ start: "karma-notes", end: "white" }}
      />
      <HeaderBlockField
         {document}
         field="karma.cyber"
         max={$document.system.rank.karmaPoints}
         direction="center"
         borderColor="karma-table"
         titleColor={{ start: "karma-begin", end: "karma-end" }}
         contentColor={{ start: "karma-notes", end: "white" }}
      />
      <HeaderBlockField
         {document}
         field="endurance"
         max={$document.system.rank.endurance}
         direction="right"
         titleColor={{ start: "endurance-begin", end: "endurance-end" }}
         contentColor={{ start: "endurance-notes", end: "white" }}
      />
   </header>
   <section id="tab-sections">
      <nav class="tabs bg-gradient-to-r from-white to-table-name border-y my-4 font-bold">
         <a href="#main" class="item px-2.5 py-1 w-full" data-tab="main" on:click|preventDefault>
            {localize("EDRPG.sheet.tabs.main")}
         </a>
         <a href="#skills" class="item px-2.5 py-1 w-full" data-tab="skills" on:click|preventDefault>
            {localize("EDRPG.sheet.tabs.skills")}
         </a>
         <a
            href="#backgrounds-karma"
            class="item px-2.5 py-1 w-full"
            data-tab="backgrounds-karma"
            on:click|preventDefault
         >
            {localize("EDRPG.sheet.tabs.bgKarma")}
         </a>
         <a href="#combat" class="item px-2.5 py-1 w-full" data-tab="combat" on:click|preventDefault>
            {localize("EDRPG.sheet.tabs.combat")}
         </a>
         <a href="#equipment" class="item px-2.5 py-1 w-full" data-tab="equipment" on:click|preventDefault>
            {localize("EDRPG.sheet.tabs.equipment")}
         </a>
      </nav>
      <section class="tab-content">
         <div class="tab" data-tab="main"></div>
         <div class="tab" data-tab="skills"><CharacterSkillsTab {document} /></div>
         <div class="tab" data-tab="backgrounds-karma"></div>
         <div class="tab" data-tab="combat"></div>
         <div class="tab" data-tab="equipment"></div>
      </section>
   </section>
</main>
