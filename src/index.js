import Styles from "./styles.css";

// ================= //
// DOM interaction
// ================= //
const MAIN = document.querySelector("main");

// ================= //
// Main
// ================= //
function main() {
    console.log("Initialazing...");

    // Get url param location
    const params = new URLSearchParams(document.location.search);
    console.log(params);

    console.log("Initialazed!");
}

main();