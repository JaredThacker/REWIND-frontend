import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [
    require('daisyui')
  ],

  daisyui: {
    themes: ["black", "luxury", "forest", {
      'REWIND': {
         'primary' : '#ffffff',
         'primary-focus' : '#486a54',
         'primary-content' : '#54486a',

         'secondary' : '#486a54',
         'secondary-focus' : '#ffffff',
         'secondary-content' : '#060404',

         'accent' : '#54486a',
         'accent-focus' : '#486a54',
         'accent-content' : '#ffffff',

         'neutral' : '#110e0e',
         'neutral-focus' : '#060404',
         'neutral-content' : '#ffffff',

         'base-100' : '#171212',
         'base-200' : '#110e0e',
         'base-300' : '#060404',
         'base-content' : '#ffffff',

         'info' : '#4c88b4',
         'success' : '#82bf97',
         'warning' : '#edd785',
         'error' : '#a1485e',

        '--rounded-box': '1rem',          
        '--rounded-btn': '.5rem',        
        '--rounded-badge': '1.9rem',      

        '--animation-btn': '.25s',       
        '--animation-input': '.2s',       

        '--btn-text-case': 'uppercase',   
        '--navbar-padding': '.5rem',      
        '--border-btn': '1px',            
      },
    },],
  },
};
export default config;
