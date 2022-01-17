"use strict";

var colors = require('tailwindcss/colors');

module.exports = {
  purge: [],
  darkMode: false,
  // or 'media' or 'class'
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))'
      }
    },
    fontFamily: {
      'mlp': ['mlp']
    },
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      grey: {
        DEFAULT: "#2D2D2D"
      },
      blue: {
        twitter: "#1DA1F2",
        light: '#52ccd6',
        DEFAULT: '#0037C1',
        dark: '#009eeb',
        discord: "#4653D6"
      },
      pink: {
        mekaverse: "#C52C64",
        light: '#ffc0e9',
        DEFAULT: '#ffc0e9',
        dark: '#fba5dd'
      },
      brown: {
        knife: "#4E4747"
      },
      yellow: {
        dark: '#fde997',
        DEFAULT: '#fff7a7',
        light: '#fff7a7'
      },
      purple: {
        discord: "#7289da"
      },
      violet: {
        light1: '#C4B5FD',
        light: '#83279a',
        DEFAULT: '#83279a',
        dark: '#321057'
      },
      black: {
        light: "#030919",
        DEFAULT: '#000000'
      },
      white: {
        DEFAULT: '#FFFFFF'
      },
      red: {
        DEFAULT: '#DC2626'
      },
      green: {
        DEFAULT: "#0BFFBF"
      },
      orange: {
        DEFAULT: '#F59E0B'
      }
    } // extend: {
    //   keyframes:{
    //     slide:{
    //       '0%': {transform:'translateX(-100%)'},
    //       '100%' : {transform:'translateX(100%)'}
    //     }
    //   }
    //   // backgroundImage: {
    //   //    'multicolor': "url('../public/multicolor.jpg')",
    //   //    'footer-texture': "url('/img/footer-texture.png')",
    //   //   }
    //   },

  },
  variants: {
    // all the following default to ['responsive']
    imageRendering: ['responsive']
  },
  plugins: [require('tailwindcss-image-rendering')() // no options to configure
  ]
};