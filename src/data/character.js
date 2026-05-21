import fromPairs from "lodash/fromPairs";
import mapValues from "lodash/mapValues";

import EDSkill from "./skill.js";
import EDMeter from "./meter.js";

export default class EDCharacterData extends foundry.abstract.TypeDataModel {
   static defineSchema() {
      const fields = foundry.data.fields;
      const requiredInteger = { required: true, nullable: false, integer: true };

      return {
         gender: new fields.StringField({ initial: "" }),
         height: new fields.StringField({ initial: "" }),
         weight: new fields.StringField({ initial: "" }),
         age: new fields.NumberField({ ...requiredInteger, initial: 0 }),
         rankPoints: new fields.NumberField({ ...requiredInteger, initial: 0 }),
         karma: new fields.SchemaField({
            standard: new fields.EmbeddedDataField(EDMeter),
            cyber: new fields.EmbeddedDataField(EDMeter),
         }),
         endurance: new fields.EmbeddedDataField(EDMeter),
         skills: new fields.SchemaField(
            mapValues(
               game.edrpg.skills,
               (category) =>
                  new fields.SchemaField(
                     fromPairs(category.map((skill) => [skill, new fields.EmbeddedDataField(EDSkill)])),
                  ),
            ),
         ),
      };
   }

   /**
    * Get the current rank of the character from its rank points.
    *
    * @returns {import("../system/game.js").Rank} Current pilot rank.
    */
   get rank() {
      return game.edrpg.ranks.find((rank) => this.rankPoints <= rank.maxRankPoints);
   }

   get initiative() {
      return this.skills.intelligence.tactics.bonus;
   }

   get dodge() {
      return this.skills.combat.dodge.bonus;
   }

   get parry() {
      return this.skills.combat.parry.bonus;
   }

   prepareDerivedData() {
      const rank = this.rank;
      for (const category of Object.values(this.skills)) {
         for (const skill of Object.values(category)) {
            skill.min = 10;
         }
      }

      this.karma.standard.max = rank.karmaPoints;
      this.karma.cyber.max = rank.karmaPoints;
      this.endurance.max = rank.endurance;

      // Pilot Trained; TODO disregard for NPCs
      this.skills.vehicle.shipPiloting.min += 20;
      this.skills.vehicle.shipWeapons.min += 20;
      this.skills.vehicle.systems.min += 10;
      for (const background of this.parent?.itemTypes?.background ?? []) {
         if (!Array.isArray(background.system?.skills)) continue;
         background.system.skills
            .filter((mod) => mod.category && mod.skill)
            .forEach((mod) => {
               const skill = this.skills[mod.category]?.[mod.skill];
               if (skill) skill.min += mod.bonus;
            });
      }
   }
}
