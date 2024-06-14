// Helper function to convert ParameterValue to ParameterValueInput
function convertParameterValue(value: ParameterValue): ParameterValueInput {
  // Determine the type of parameter and convert accordingly
  if (typeof value.operator === 'string') {
    return {
      inputType: "stringParameter",
      stringParameter: {
        identifier: value.identifier,
        operator: value.operator,
        value: "" // Assuming a default value, adjust as necessary
      }
    };
  } else if (typeof value.operator === 'number') {
    return {
      inputType: "floatParameter",
      floatParameter: {
        identifier: value.identifier,
        operator: value.operator,
        value: 0 // Assuming a default value, adjust as necessary
      }
    };
  } else if (typeof value.operator === 'boolean') {
    return {
      inputType: "booleanParameter",
      booleanParameter: {
        identifier: value.identifier,
        operator: value.operator,
        value: false // Assuming a default value, adjust as necessary
      }
    };
  } else if (Array.isArray(value.operator)) {
    return {
      inputType: "stringListParameter",
      stringListParameter: {
        identifier: value.identifier,
        operator: value.operator,
        values: [] // Assuming a default value, adjust as necessary
      }
    };
  } else {
    throw new Error(`Unsupported parameter type: ${typeof value.operator}`);
  }
}

// Function to convert DynamicBasketDefinition to DynamicBasketCreateDefinitionInput
function convertDefinition(dynamicBasketDefinition: DynamicBasketDefinition): DynamicBasketCreateDefinitionInput {
  return {
    identifier: dynamicBasketDefinition.identifier,
    user: dynamicBasketDefinition.user,
    definitionName: dynamicBasketDefinition.name,
    watchlistId: dynamicBasketDefinition.watchlistIdentifier,
    objective: convertParameterBlockValue(dynamicBasketDefinition.objective),
    constraints: convertParameterBlockValue(dynamicBasketDefinition.constraints),
    rebalancingConfig: convertParameterBlockValue(dynamicBasketDefinition.rebalancingConfig),
    pricingConfig: convertParameterBlockValue(dynamicBasketDefinition.pricingConfig),
  };
}

// Helper function to convert ParameterBlockValue to ParameterBlockValueInput
function convertParameterBlockValue(block: ParameterBlockValue): ParameterBlockValueInput {
  return {
    inputType: "block", // Assuming a default inputType, adjust as necessary
    parameterListBlock: block.values ? {
      identifier: block.identifier,
      isAnd: block.isAnd,
      values: block.values.map(convertParameterValue)
    } : undefined,
    compositeParameterBlock: block.values ? {
      identifier: block.identifier,
      isAnd: block.isAnd,
      parameterBlocks: block.values.map(convertParameterBlockValue)
    } : undefined
  };
}
