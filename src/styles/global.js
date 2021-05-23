import { createGlobalStyle } from "styled-components";
import LatoRegularWoff2 from "../assets/fonts/Lato-Regular.woff2";
import LatoRegularWoff from "../assets/fonts/Lato-Regular.woff";
import LatoRegularTtf from "../assets/fonts/Lato-Regular.ttf";
import LatoBoldWoff2 from "../assets/fonts/Lato-700.woff2";
import LatoBoldWoff from "../assets/fonts/Lato-700.woff";
import LatoBoldTtf from "../assets/fonts/Lato-700.ttf";

const GlobalStyle = createGlobalStyle`
  /*! normalize.css v8.0.1 | MIT License | github.com/necolas/normalize.css */html{line-height:1.15;-webkit-text-size-adjust:100%}body{margin:0}main{display:block}h1{font-size:2em;margin:.67em 0}hr{box-sizing:content-box;height:0;overflow:visible}pre{font-family:monospace,monospace;font-size:1em}a{background-color:transparent}abbr[title]{border-bottom:none;text-decoration:underline;text-decoration:underline dotted}b,strong{font-weight:bolder}code,kbd,samp{font-family:monospace,monospace;font-size:1em}small{font-size:80%}sub,sup{font-size:75%;line-height:0;position:relative;vertical-align:baseline}sub{bottom:-.25em}sup{top:-.5em}img{border-style:none}button,input,optgroup,select,textarea{font-family:inherit;font-size:100%;line-height:1.15;margin:0}button,input{overflow:visible}button,select{text-transform:none}[type=button],[type=reset],[type=submit],button{-webkit-appearance:button}[type=button]::-moz-focus-inner,[type=reset]::-moz-focus-inner,[type=submit]::-moz-focus-inner,button::-moz-focus-inner{border-style:none;padding:0}[type=button]:-moz-focusring,[type=reset]:-moz-focusring,[type=submit]:-moz-focusring,button:-moz-focusring{outline:1px dotted ButtonText}fieldset{padding:.35em .75em .625em}legend{box-sizing:border-box;color:inherit;display:table;max-width:100%;padding:0;white-space:normal}progress{vertical-align:baseline}textarea{overflow:auto}[type=checkbox],[type=radio]{box-sizing:border-box;padding:0}[type=number]::-webkit-inner-spin-button,[type=number]::-webkit-outer-spin-button{height:auto}[type=search]{-webkit-appearance:textfield;outline-offset:-2px}[type=search]::-webkit-search-decoration{-webkit-appearance:none}::-webkit-file-upload-button{-webkit-appearance:button;font:inherit}details{display:block}summary{display:list-item}template{display:none}[hidden]{display:none}
  
  @font-face {
    font-family: "Lato";
    src: url(${LatoRegularWoff2}) format("woff2"),
      url(${LatoRegularWoff}) format("woff"),
      url(${LatoRegularTtf}) format("truetype");
    font-display: swap;
    font-weight: 400;
  }

  @font-face {
    font-family: "Lato";
    src: url(${LatoBoldWoff2}) format("woff2"),
      url(${LatoBoldWoff}) format("woff"),
      url(${LatoBoldTtf}) format("truetype");
    font-display: swap;
    font-weight: 700;
  }

  html {
    font-size: 16px;
    font-family: "Lato", sans-serif;
    color: #202940;
  }
  
  p, h1, h2, h3, h4 {
    margin: 0;
  }
`;

export default GlobalStyle;
