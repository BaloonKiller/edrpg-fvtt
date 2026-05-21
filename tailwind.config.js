import forms from "@tailwindcss/forms";
import clipPath from "tailwind-clip-path";

/** @type {import('tailwindcss').Config} */
export default {
   content: ["./src/**/*.{js,svelte}"],
   safelist: [
      { pattern: /clip-path-header-block-.*/ },
      { pattern: /(from|to)-.*-(begin|end|notes)/ },
      "border-karma-table",
      "text-left",
      "text-right",
   ],

   theme: {
      colors: {
         black: "#000000",
         white: "#ffffff",
         transparent: "transparent",
         section: {
            begin: "#000007",
            "embedded-header": "#025778",
            end: "#3397d9",
         },
         secondary: "#2b3d4f",
         notes: "#e3e3e3",
         border: "#858585",
         table: {
            header: "#759cc7",
            check: "#4c82ba",
            name: "#a8bad9",
            cell: "#eeeeee",
            highlight: "#dee8f3",
            "highlight-border": "#5e85ab",
            military: "#c7d4e6",
         },
         damage: {
            DEFAULT: "#fae3dc",
            border: "#f04f21",
         },
         karma: {
            begin: "#2e0078",
            end: "#8a51ff",
            notes: "#c2b8ff",
            table: "#9e9cd1",
            name: "#bdbae0",
         },
         endurance: {
            begin: "#e60000",
            end: "#ff9700",
            notes: "#f8c2b5",
         },
         cash: "#68d7ba",
      },
      clipPath: {
         "header-block-left": {
            title: "polygon(0 0, 50% 0, 75% 100%, 0 100%)",
            content: "polygon(0 0, 75% 0, 100% 100%, 25% 100%)",
         },
         "header-block-center": {
            title: "polygon(25% 0, 75% 0, 100% 100%, 0 100%)",
            content: "polygon(0 0, 100% 0, 75% 100%, 25% 100%)",
         },
         "header-block-right": {
            title: "polygon(50% 0, 100% 0, 100% 100%, 25% 100%)",
            content: "polygon(25% 0, 100% 0%, 75% 100%, 0% 100%)",
         },
      },
   },

   plugins: [forms, clipPath],
};
