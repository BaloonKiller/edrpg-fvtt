export default class EDSkill extends foundry.abstract.DataModel {
   min = 10;

   static defineSchema() {
      return {
         learning: new foundry.data.fields.NumberField({
            required: true,
            integer: true,
            initial: 0,
         }),
         used: new foundry.data.fields.BooleanField({ initial: false }),
      };
   }

   get value() {
      return this.min + this.learning;
   }

   /**
    * Get the current rolling bonus for the skill.
    *
    * @returns {number} Current rolling bonus.
    */
   get bonus() {
      return Math.floor(this.value / 10);
   }

   get max() {
      let model = this.parent;
      while (model && !model.rank) {
         model = model.parent;
      }
      return model?.rank?.skillCap ?? 100;
   }
}
