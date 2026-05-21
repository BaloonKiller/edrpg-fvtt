export default class EDMeter extends foundry.abstract.DataModel {
   static defineSchema() {
      return {
         value: new foundry.data.fields.NumberField({
            required: true,
            integer: true,
            min: 0,
            initial: 0,
         }),
         max: new foundry.data.fields.NumberField({
            required: true,
            integer: true,
            min: 0,
            initial: 0,
         }),
      };
   }
}
