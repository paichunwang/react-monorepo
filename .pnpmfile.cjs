// function readPackage(pkg) {
//   const STRICT_PEER_DEPS = ["cesium", "react"];

//   // Exclude root workspace from restriction
//   if (pkg.name === "react-monorepo-root") {
//     return pkg;
//   }

//   for (const dep of STRICT_PEER_DEPS) {
//     const isRegularDep = Boolean(pkg.dependencies?.[dep]);
//     const isDevDep = Boolean(pkg.devDependencies?.[dep]);

//     if (isRegularDep || isDevDep) {
//       const currentBlock = isRegularDep ? "dependencies" : "devDependencies";
//       throw new Error(
//         `\n\n❌ [Monorepo Policy Error] "${dep}" in "${pkg.name}" is declared under "${currentBlock}".\n` +
//           `   👉 Policy requires "${dep}" to ALWAYS be listed under "peerDependencies".\n`
//       );
//     }
//   }

//   return pkg;
// }

// module.exports = {
//   hooks: {
//     readPackage,
//   },
// };
