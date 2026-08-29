export interface FormulaContext {
  weight_kg: number;
  loss_rate_without_cold_chain: number;
  loss_rate_with_cold_chain: number;
  food_loss_avoided?: number;
  avg_price_per_kg_by_species: number;
  economic_value_preserved?: number;
  solar_kwh: number;
  total_kwh: number;
  CO2_per_kwh_grid?: number;
  CO2_per_kwh_solar?: number;
  fisherman_share_pct?: number;
  [key: string]: number | undefined;
}

/**
 * Safely evaluates mathematical expressions using tokenized variable substitution
 */
export function evaluateFormula(expression: string, context: FormulaContext): number {
  try {
    const CO2_grid = context.CO2_per_kwh_grid ?? 0.78;
    const CO2_solar = context.CO2_per_kwh_solar ?? 0.05;
    const fisherman_share = context.fisherman_share_pct ?? 0.65;

    // Derived values if not already supplied
    const calculatedFoodLossAvoided =
      context.food_loss_avoided ??
      context.weight_kg * (context.loss_rate_without_cold_chain - context.loss_rate_with_cold_chain);

    const calculatedEconomicValue =
      context.economic_value_preserved ??
      calculatedFoodLossAvoided * context.avg_price_per_kg_by_species;

    const fullContext: Record<string, number> = {
      weight_kg: context.weight_kg,
      loss_rate_without_cold_chain: context.loss_rate_without_cold_chain,
      loss_rate_with_cold_chain: context.loss_rate_with_cold_chain,
      food_loss_avoided: calculatedFoodLossAvoided,
      avg_price_per_kg_by_species: context.avg_price_per_kg_by_species,
      economic_value_preserved: calculatedEconomicValue,
      solar_kwh: context.solar_kwh,
      total_kwh: context.total_kwh > 0 ? context.total_kwh : 1,
      CO2_per_kwh_grid: CO2_grid,
      CO2_per_kwh_solar: CO2_solar,
      fisherman_share_pct: fisherman_share,
    };

    // Clean expression and replace variable identifiers with actual numerical values
    let sanitized = expression;

    // Replace variable names sorted by length descending so substrings don't get replaced first
    const varKeys = Object.keys(fullContext).sort((a, b) => b.length - a.length);
    for (const key of varKeys) {
      const val = fullContext[key];
      const regex = new RegExp(`\\b${key}\\b`, "g");
      sanitized = sanitized.replace(regex, val.toString());
    }

    // Sanitize: allow only numbers, basic math operators, parentheses, decimal dots, and spaces
    if (!/^[0-9+\-*/().\s]+$/.test(sanitized)) {
      console.warn("Formula contains unsafe or invalid tokens:", expression);
      return 0;
    }

    // Function evaluator for arithmetic
    const result = new Function(`return (${sanitized});`)();
    const num = Number(result);
    return isNaN(num) || !isFinite(num) ? 0 : Math.round(num * 100) / 100;
  } catch (err) {
    console.error("Failed to evaluate formula:", expression, err);
    return 0;
  }
}

export function calculateComprehensiveImpact(
  weightKg: number,
  durationDays: number,
  lossRateWithoutColdChainPct: number,
  lossRateWithColdChainPct: number,
  avgMarketPriceRp: number,
  formulas: { formulaKey: string; formulaExpression: string }[],
  solarKwPerHour: number = 8.4
) {
  const lossWithout = lossRateWithoutColdChainPct / 100;
  const lossWith = lossRateWithColdChainPct / 100;
  const totalSolarKwh = solarKwPerHour * 5.5 * durationDays; // average 5.5 peak solar hours/day
  const totalStorageKwh = 12 * durationDays; // approx 12 kWh/day for cold room

  const ctx: FormulaContext = {
    weight_kg: weightKg,
    loss_rate_without_cold_chain: lossWithout,
    loss_rate_with_cold_chain: lossWith,
    avg_price_per_kg_by_species: avgMarketPriceRp,
    solar_kwh: totalSolarKwh,
    total_kwh: totalStorageKwh,
    CO2_per_kwh_grid: 0.78,
    CO2_per_kwh_solar: 0.05,
    fisherman_share_pct: 0.65,
  };

  const getExpr = (key: string, fallback: string) => {
    const found = formulas.find((f) => f.formulaKey === key);
    return found ? found.formulaExpression : fallback;
  };

  // 1. Food loss avoided (kg)
  const foodLossAvoidedKg = evaluateFormula(
    getExpr("food_loss_avoided", "weight_kg * (loss_rate_without_cold_chain - loss_rate_with_cold_chain)"),
    ctx
  );
  ctx.food_loss_avoided = foodLossAvoidedKg;

  // 2. Economic value preserved (Rp)
  const economicValueRp = evaluateFormula(
    getExpr("economic_value", "food_loss_avoided * avg_price_per_kg_by_species"),
    ctx
  );
  ctx.economic_value_preserved = economicValueRp;

  // 3. CO2 avoided (kg)
  const co2AvoidedKg = evaluateFormula(
    getExpr("co2_avoided", "(solar_kwh * 0.78) - (solar_kwh * 0.05)"),
    ctx
  );

  // 4. Renewable share (%)
  const renewableSharePct = evaluateFormula(
    getExpr("renewable_share", "(solar_kwh / total_kwh) * 100"),
    ctx
  );

  // 5. Income improvement (Rp)
  const incomeImprovementRp = evaluateFormula(
    getExpr("income_improvement", "economic_value_preserved * 0.65"),
    ctx
  );

  return {
    foodLossAvoidedKg,
    economicValueRp,
    co2AvoidedKg,
    renewableSharePct: Math.min(100, renewableSharePct),
    incomeImprovementRp,
    solarKwh: Math.round(totalSolarKwh * 10) / 10,
  };
}
