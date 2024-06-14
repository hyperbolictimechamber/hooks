interface DynamicBasketDefinition {
  timeCreated: string;
  timeUpdated: string;
  identifier: string;
  user: string;
  name: string;
  namespace: string;
  watchlistIdentifier: string;
  objective: ParameterBlockValue[];
  constraints: ParameterBlockValue[];
  rebalancingConfig: ParameterBlockValue[];
  pricingConfig: ParameterBlockValue[];
}

interface DynamicBasketCreateDefinitionInput {
  identifier: string;
  user: string;
  definitionName: string;
  watchlistId: string;
  objective: ParameterBlockValueInput;
  constraints: ParameterBlockValueInput;
  rebalancingConfig: ParameterBlockValueInput;
  pricingConfig: ParameterBlockValueInput;
}

interface ParameterBlockValue {
  identifier: string;
  values: ParameterValue[];
  _typename: string;
}

interface ParameterBlockValueInput {
  identifier: string;
  parameterListBlock?: ParameterListBlockValueInput;
  compositeParameterBlock?: CompositeParameterBlockValueInput;
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

interface ParameterListBlockValueInput {
  identifier: string;
  values: ParameterValueInput[];
}

interface CompositeParameterBlockValueInput {
  identifier: string;
  isAnd: boolean;
  parameterBlocks: ParameterBlockValueInput[];
}

function convertParameterBlockValueToInput(block: ParameterBlockValue): ParameterBlockValueInput {
  if (block._typename === 'ParameterListBlockValue') {
    return {
      identifier: block.identifier,
      parameterListBlock: {
        identifier: block.identifier,
        values: block.values.map(convertParameterValueToInput)
      }
    };
  } else if (block._typename === 'CompositeParameterBlockValue') {
    return {
      identifier: block.identifier,
      compositeParameterBlock: {
        identifier: block.identifier,
        isAnd: (block as any).isAnd,
        parameterBlocks: (block as any).parameterBlocks.map(convertParameterBlockValueToInput)
      }
    };
  } else {
    throw new Error(`Unknown ParameterBlockValue type: ${block._typename}`);
  }
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
    objective: convertParameterBlockValueToInput(definition.objective[0]),
    constraints: convertParameterBlockValueToInput(definition.constraints[0]),
    rebalancingConfig: convertParameterBlockValueToInput(definition.rebalancingConfig[0]),
    pricingConfig: convertParameterBlockValueToInput(definition.pricingConfig[0])
  };
}
