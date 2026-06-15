import {
  computePreparationIndex,
  estimateSteps,
  loadKnowledgeBase,
  resolveRoute,
  trafficLightClass,
} from "@/lib/engine";
import type { ResolveInput } from "@/lib/types/lumia";
import countries from "@/data/countries.json";
import entities from "@/data/entities.json";
import routes from "@/data/routes.json";

const kb = loadKnowledgeBase(routes, countries, entities);

const fixtures: { name: string; input: ResolveInput }[] = [
  {
    name: "Peruvian academic degree to Spain (Hague, study)",
    input: {
      documentTypeId: "academic-degree",
      destinationCountryCode: "ES",
      purpose: "study",
      hasOriginalDocument: true,
    },
  },
  {
    name: "Peruvian academic degree to China (non-Hague)",
    input: {
      documentTypeId: "academic-degree",
      destinationCountryCode: "CN",
      purpose: "work",
      hasOriginalDocument: true,
    },
  },
  {
    name: "Peruvian transcript to Germany (Hague)",
    input: {
      documentTypeId: "academic-transcript",
      destinationCountryCode: "DE",
      purpose: "study",
      hasOriginalDocument: true,
    },
  },
  {
    name: "Notarized copy to France (Hague)",
    input: {
      documentTypeId: "notarized-copy",
      destinationCountryCode: "FR",
      purpose: "work",
      hasOriginalDocument: true,
    },
  },
  {
    name: "Unsupported country",
    input: {
      documentTypeId: "academic-degree",
      destinationCountryCode: "JP",
      purpose: "study",
      hasOriginalDocument: true,
    },
  },
  {
    name: "No matching route",
    input: {
      documentTypeId: "birth-certificate",
      destinationCountryCode: "ES",
      purpose: "study",
      hasOriginalDocument: true,
    },
  },
];

let passed = 0;
let failed = 0;

for (const { name, input } of fixtures) {
  console.log(`\n▶ ${name}`);
  const result = resolveRoute(input, kb);

  if ("message" in result) {
    console.log(`  → no route: ${result.message}`);
    passed += 1;
    continue;
  }

  const route = result;
  const estimate = estimateSteps(route.steps);
  const index = computePreparationIndex({
    requiredDocuments: route.requiredDocuments,
    optionalDocuments: route.optionalDocuments,
    readyDocuments: route.requiredDocuments,
  });

  console.log(`  route: ${route.id}`);
  console.log(`  total cost: S/ ${route.totalCost} | days: ${route.totalDays}`);
  console.log(`  steps:`);
  estimate.steps.forEach((step) => {
    console.log(
      `    ${step.stepNumber}. ${step.entityId} → ${step.action} (S/ ${step.cost}, ${step.days}d)`
    );
  });
  console.log(`  readiness index (all required): ${index} (${trafficLightClass(index)})`);

  if (route.totalCost === estimate.totalCost && route.totalDays === estimate.totalDays) {
    passed += 1;
  } else {
    console.error(`  ✗ totals mismatch`);
    failed += 1;
  }
}

console.log(`\n${passed} passed, ${failed} failed`);
if (failed > 0) {
  process.exit(1);
}
