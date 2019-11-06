import { deepCloneObject } from '../helpers/deep-clone-object';

enum Modules {
  W = 'W',
  X = 'X',
  Y = 'Y',
  Z = 'Z'
}

enum CompoundComponents {
  plusTwo = 1,
  reverse = 2,
  stop = 3
}

enum IntegratorComponents {
  chooseModule = 1,
  plusFour = 2
}

interface ConfigComponentGenerator {
  mod: Modules | null;
  compound?: CompoundComponents;
  integrator?: IntegratorComponents;
}

interface Component {
  name: string;
  mod: Modules | null;
  compound: boolean;
  integrator: boolean;
  type: { text: string | null; icon: string | null };
  help: string;
  description: string;
  score: number;
}

const helpCompoundComponents = {
  [CompoundComponents.plusTwo]: {
    help: 'Estimación de la calidad de dos componentes nuevos',
    icon: null,
    text: '+2C'
  },
  [CompoundComponents.reverse]: {
    help: 'Cambia sentido en el proceso de entrega de las estimaciones',
    icon: 'sync',
    text: null
  },
  [CompoundComponents.stop]: {
    help: 'Impide entrega de estimación del siguiente equipo',
    icon: 'stop',
    text: null
  }
};

const helpIntegratorComponents = {
  [IntegratorComponents.chooseModule]: {
    help:
      'Establece un núevo módulo al cual el siguiente equipo deberá realizar la entrega',
    icon: 'appstore',
    text: null
  },
  [IntegratorComponents.plusFour]: {
    help: 'Estimación de la calidad de cuatro componentes nuevos',
    text: '+4C',
    icon: null
  }
};

function generateComponents({
  mod,
  compound,
  integrator
}: ConfigComponentGenerator): Component[] {
  const baseComponent: Component = {
    name: '',
    mod: null,
    compound: false,
    integrator: false,
    type: {
      text: null,
      icon: null
    },
    help: '',
    description: '',
    score: 0
  };
  const components: Component[] = [];
  const options = compound ? 'compound' : integrator ? 'integrator' : '';

  switch (options) {
    case 'compound':
      baseComponent.description = `Componente compuesto del <strong>módulo ${mod}</strong>.`;
      baseComponent.score = 20;
      baseComponent.compound = true;
      baseComponent.name = `CC-M${mod}`;
      baseComponent.mod = mod;
      //@ts-ignore
      baseComponent.type.icon = helpCompoundComponents[compound].icon;
      //@ts-ignore
      baseComponent.type.text = helpCompoundComponents[compound].text;
      //@ts-ignore
      baseComponent.help = helpCompoundComponents[compound].help;
      for (let i = 0; i < 2; i++) {
        const component = deepCloneObject(baseComponent);
        components.push(component);
      }
      break;
    case 'integrator':
      baseComponent.description = `Componente integrador.`;
      baseComponent.score = 50;
      baseComponent.integrator = true;
      baseComponent.name = 'CI';
      //@ts-ignore
      baseComponent.type.icon = helpIntegratorComponents[integrator].icon;
      //@ts-ignore
      baseComponent.type.text = helpIntegratorComponents[integrator].text;
      //@ts-ignore
      baseComponent.help = helpIntegratorComponents[integrator].help;
      for (let i = 0; i < 4; i++) {
        const component = deepCloneObject(baseComponent);
        components.push(component);
      }
      break;
    default:
      baseComponent.description = `Componente del <strong>módulo ${mod}</strong>.`;
      for (let i = 0; i < 19; i++) {
        const component = deepCloneObject(baseComponent);
        const metric = i < 10 ? i : i - 9;
        component.name = `C-M${mod}`;
        component.mod = mod;
        component.type.text = `JCCM ${metric}`;
        component.help = `Componente con medida JCCM ${metric}`;
        component.score = metric;
        components.push(component);
      }
  }
  return components;
}

export const components = [
  ...generateComponents({ mod: Modules.W }),
  ...generateComponents({
    mod: Modules.W,
    compound: CompoundComponents.plusTwo
  }),
  ...generateComponents({
    mod: null,
    integrator: IntegratorComponents.plusFour
  })
];

export const materials = {
  component1: {
    name: 'C-MW',
    mod: 'W',
    compound: false,
    integrator: false,
    type: {
      text: 'JCCM 0',
      icon: null
    },
    help: 'Componente con medida JCCM 0',
    description: 'Componente del <strong>módulo W</strong>.',
    score: 0
  },
  component2: {
    name: 'C-MW',
    mod: 'W',
    compound: false,
    integrator: false,
    type: {
      text: 'JCCM 1',
      icon: null
    },
    help: 'Componente con medida JCCM 1',
    description: 'Componente del <strong>módulo W</strong>.',
    score: 1
  },
  component3: {
    name: 'C-MW',
    mod: 'W',
    compound: false,
    integrator: false,
    type: {
      text: 'JCCM 2',
      icon: null
    },
    help: 'Componente con medida JCCM 2',
    description: 'Componente del <strong>módulo W</strong>.',
    score: 2
  },
  component4: {
    name: 'C-MW',
    mod: 'W',
    compound: false,
    integrator: false,
    type: {
      text: 'JCCM 3',
      icon: null
    },
    help: 'Componente con medida JCCM 3',
    description: 'Componente del <strong>módulo W</strong>.',
    score: 3
  },
  component5: {
    name: 'C-MW',
    mod: 'W',
    compound: false,
    integrator: false,
    type: {
      text: 'JCCM 4',
      icon: null
    },
    help: 'Componente con medida JCCM 4',
    description: 'Componente del <strong>módulo W</strong>.',
    score: 4
  },
  component6: {
    name: 'C-MW',
    mod: 'W',
    compound: false,
    integrator: false,
    type: {
      text: 'JCCM 5',
      icon: null
    },
    help: 'Componente con medida JCCM 5',
    description: 'Componente del <strong>módulo W</strong>.',
    score: 5
  },
  component7: {
    name: 'C-MW',
    mod: 'W',
    compound: false,
    integrator: false,
    type: {
      text: 'JCCM 6',
      icon: null
    },
    help: 'Componente con medida JCCM 6',
    description: 'Componente del <strong>módulo W</strong>.',
    score: 6
  },
  component8: {
    name: 'C-MW',
    mod: 'W',
    compound: false,
    integrator: false,
    type: {
      text: 'JCCM 7',
      icon: null
    },
    help: 'Componente con medida JCCM 7',
    description: 'Componente del <strong>módulo W</strong>.',
    score: 7
  },
  component9: {
    name: 'C-MW',
    mod: 'W',
    compound: false,
    integrator: false,
    type: {
      text: 'JCCM 8',
      icon: null
    },
    help: 'Componente con medida JCCM 8',
    description: 'Componente del <strong>módulo W</strong>.',
    score: 8
  },
  component10: {
    name: 'C-MW',
    mod: 'W',
    compound: false,
    integrator: false,
    type: {
      text: 'JCCM 9',
      icon: null
    },
    help: 'Componente con medida JCCM 9',
    description: 'Componente del <strong>módulo W</strong>.',
    score: 9
  },
  component11: {
    name: 'C-MW',
    mod: 'W',
    compound: false,
    integrator: false,
    type: {
      text: 'JCCM 1',
      icon: null
    },
    help: 'Componente con medida JCCM 1',
    description: 'Componente del <strong>módulo W</strong>.',
    score: 1
  },
  component12: {
    name: 'C-MW',
    mod: 'W',
    compound: false,
    integrator: false,
    type: {
      text: 'JCCM 2',
      icon: null
    },
    help: 'Componente con medida JCCM 2',
    description: 'Componente del <strong>módulo W</strong>.',
    score: 2
  },
  component13: {
    name: 'C-MW',
    mod: 'W',
    compound: false,
    integrator: false,
    type: {
      text: 'JCCM 3',
      icon: null
    },
    help: 'Componente con medida JCCM 3',
    description: 'Componente del <strong>módulo W</strong>.',
    score: 3
  },
  component14: {
    name: 'C-MW',
    mod: 'W',
    compound: false,
    integrator: false,
    type: {
      text: 'JCCM 4',
      icon: null
    },
    help: 'Componente con medida JCCM 4',
    description: 'Componente del <strong>módulo W</strong>.',
    score: 4
  },
  component15: {
    name: 'C-MW',
    mod: 'W',
    compound: false,
    integrator: false,
    type: {
      text: 'JCCM 5',
      icon: null
    },
    help: 'Componente con medida JCCM 5',
    description: 'Componente del <strong>módulo W</strong>.',
    score: 5
  },
  component16: {
    name: 'C-MW',
    mod: 'W',
    compound: false,
    integrator: false,
    type: {
      text: 'JCCM 6',
      icon: null
    },
    help: 'Componente con medida JCCM 6',
    description: 'Componente del <strong>módulo W</strong>.',
    score: 6
  },
  component17: {
    name: 'C-MW',
    mod: 'W',
    compound: false,
    integrator: false,
    type: {
      text: 'JCCM 3',
      icon: null
    },
    help: 'Componente con medida JCCM 3',
    description: 'Componente del <strong>módulo W</strong>.',
    score: 3
  }
};
