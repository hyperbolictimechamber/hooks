interface DynamicBasketDefinition {
  timeCreated: string;
  timeUpdated: string;
  identifier: string;
  user: string;
  name: string;
  namespace: string;
  watchlistIdentifier: string;
  objective: ParameterBlockValue;
  constraints: ParameterBlockValue[];
  rebalancingConfig: ParameterBlockValue;
  pricingConfig: ParameterBlockValue;
}

interface DynamicBasketCreateDefinitionInput {
  identifier: string;
  user: string;
  definitionName: string;
  watchlistId: string;
  objective: ParameterBlockValueInput;
  constraints: ParameterBlockValueInput[];
  rebalancingConfig: ParameterBlockValueInput;
  pricingConfig: ParameterBlockValueInput;
}

interface ParameterBlockValue {
  identifier: string;
  values: ParameterValue[];
}

interface ParameterBlockValueInput {
  identifier: string;
  values: ParameterValueInput[];
}

interface ParameterValue {
  identifier: string;
  operator: string;
  _typename: string;
}

interface ParameterValueInput {
  inputType: string;
  stringParameter?: StringParameterValueInput;
  floatParameter?: FloatParameterValueInput;
  intParameter?: IntParameterValueInput;
  floatRangeParameter?: FloatRangeParameterValueInput;
  booleanParameter?: BooleanParameterValueInput;
  stringListParameter?: StringListParameterValueInput;
}

interface StringParameterValueInput {
  identifier: string;
  operator: string;
  value: string;
}

interface FloatParameterValueInput {
  identifier: string;
  operator: string;
  value: number;
}

interface IntParameterValueInput {
  identifier: string;
  operator: string;
  value: number;
}

interface FloatRangeParameterValueInput {
  identifier: string;
  operator: string;
  minValue: number;
  maxValue: number;
}

interface BooleanParameterValueInput {
  identifier: string;
  operator: string;
  value: boolean;
}

interface StringListParameterValueInput {
  identifier: string;
  operator: string;
  values: string[];
}

function convertParameterBlockValueToInput(block: ParameterBlockValue): ParameterBlockValueInput {
  return {
    identifier: block.identifier,
    values: block.values.map(convertParameterValueToInput)
  };
}

function convertParameterValueToInput(value: ParameterValue): ParameterValueInput {
  switch (value._typename) {
    case 'StringParameterValue':
      return {
        inputType: 'StringParameterValueInput',
        stringParameter: {
          identifier: value.identifier,
          operator: value.operator,
          value: (value as any).stringValue
        }
      };
    case 'FloatParameterValue':
      return {
        inputType: 'FloatParameterValueInput',
        floatParameter: {
          identifier: value.identifier,
          operator: value.operator,
          value: (value as any).floatValue
        }
      };
    case 'IntParameterValue':
      return {
        inputType: 'IntParameterValueInput',
        intParameter: {
          identifier: value.identifier,
          operator: value.operator,
          value: (value as any).intValue
        }
      };
    case 'FloatRangeParameterValue':
      return {
        inputType: 'FloatRangeParameterValueInput',
        floatRangeParameter: {
          identifier: value.identifier,
          operator: value.operator,
          minValue: (value as any).minValue,
          maxValue: (value as any).maxValue
        }
      };
    case 'BooleanParameterValue':
      return {
        inputType: 'BooleanParameterValueInput',
        booleanParameter: {
          identifier: value.identifier,
          operator: value.operator,
          value: (value as any).booleanValue
        }
      };
    case 'StringListParameterValue':
      return {
        inputType: 'StringListParameterValueInput',
        stringListParameter: {
          identifier: value.identifier,
          operator: value.operator,
          values: (value as any).stringValues
        }
      };
    default:
      throw new Error(`Unknown ParameterValue type: ${value._typename}`);
  }
}

function convertDynamicBasketDefinitionToDynamicBasketCreateDefinitionInput(
  definition: DynamicBasketDefinition
): DynamicBasketCreateDefinitionInput {
  return {
    identifier: definition.identifier,
    user: definition.user,
    definitionName: definition.name,
    watchlistId: definition.watchlistIdentifier,
    objective: convertParameterBlockValueToInput(definition.objective),
    constraints: definition.constraints.map(convertParameterBlockValueToInput),
    rebalancingConfig: convertParameterBlockValueToInput(definition.rebalancingConfig),
    pricingConfig: convertParameterBlockValueToInput(definition.pricingConfig)
  };
}
