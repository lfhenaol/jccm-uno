import { deepCloneObject } from '../helpers/deep-clone-object';
import { Random } from 'random-js';
import { StatusTeam } from '../actions';

export enum Modules {
  W = 'W',
  X = 'X',
  Y = 'Y',
  Z = 'Z'
}

export enum CompoundComponents {
  plusTwo = 1,
  reverse = 2,
  stop = 3
}

export enum IntegratorComponents {
  chooseModule = 1,
  plusFour = 2
}

interface ConfigComponentGenerator {
  mod: Modules | null;
  compound?: CompoundComponents;
  integrator?: IntegratorComponents;
}

export interface Component {
  id: string;
  name: string;
  mod: Modules | null;
  compound: boolean;
  integrator: boolean;
  type: { text: string | undefined; icon: string | undefined, code: number | undefined };
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
    id: '',
    name: '',
    mod: null,
    compound: false,
    integrator: false,
    type: {
      text: undefined,
      icon: undefined,
      code: undefined
    },
    help: '',
    description: '',
    score: 0
  };
  const components: Component[] = [];
  const options = compound ? 'compound' : integrator ? 'integrator' : '';

  if (options === 'compound') {
    baseComponent.description = `Componente compuesto del <strong>módulo ${mod}</strong>.`;
    baseComponent.score = 20;
    baseComponent.compound = true;
    baseComponent.name = `CC-M${mod}`;
    baseComponent.mod = mod;
    // @ts-ignore
    baseComponent.type.code = compound;
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
  } else if (options === 'integrator') {
    baseComponent.description = `Componente integrador.`;
    baseComponent.score = 50;
    baseComponent.integrator = true;
    baseComponent.name = 'CI';
    // @ts-ignore
    baseComponent.type.code = integrator;
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
  } else {
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

function generateComponentsFor(mod: Modules) {
  return [
    ...generateComponents({ mod }),
    ...generateComponents({
      mod,
      compound: CompoundComponents.plusTwo
    }),
    ...generateComponents({
      mod,
      compound: CompoundComponents.stop
    }),
    ...generateComponents({
      mod,
      compound: CompoundComponents.reverse
    })
  ];
}

function random(a: number, b: number) {
  const rand = new Random();
  return rand.integer(a, b);
}

function getRandomComponents(list: any[], amount?: number): any[] {
  console.log(list.length);
  const result = [];
  let count = 0;
  while (Array.isArray(list) && list.length > 0) {
    const elem = list.splice(random(0, list.length - 1), 1)[0];
    result.push(elem);
    if (amount && !isNaN(Number(amount)) && amount - 1 === count) {
      return result;
    }
    count++;
  }
  return result;
}

export function popSevenRandomComponents(list: any[]) {
  return getRandomComponents(list, 7);
}

let materials = [
  ...generateComponentsFor(Modules.W),
  ...generateComponentsFor(Modules.X),
  ...generateComponentsFor(Modules.Y),
  ...generateComponentsFor(Modules.Z),
  ...generateComponents({
    mod: null,
    integrator: IntegratorComponents.plusFour
  }),
  ...generateComponents({
    mod: null,
    integrator: IntegratorComponents.chooseModule
  })
].map((component, index) => {
  component.id = index.toString();
  return component;
});

materials = getRandomComponents(materials);

export interface Team {
  id: string;
  name: string;
  status: StatusTeam;
  components: Component[];
}

export const teams: Team[] = [
  {
    id: '0',
    name: 'Equipo 1',
    status: StatusTeam.ESTIMING,
    components: popSevenRandomComponents(materials)
  },
  {
    id: '1',
    name: 'Equipo 2',
    status: StatusTeam.WAITING,
    components: popSevenRandomComponents(materials)
  },
  {
    id: '2',
    name: 'Equipo 3',
    status: StatusTeam.WAITING,
    components: popSevenRandomComponents(materials)
  },
  {
    id: '3',
    name: 'Equipo 4',
    status: StatusTeam.WAITING,
    components: popSevenRandomComponents(materials)
  },
  {
    id: '4',
    name: 'Equipo 5',
    status: StatusTeam.WAITING,
    components: popSevenRandomComponents(materials)
  },
  {
    id: '5',
    name: 'Equipo 6',
    status: StatusTeam.WAITING,
    components: popSevenRandomComponents(materials)
  },
  {
    id: '6',
    name: 'Equipo 7',
    status: StatusTeam.WAITING,
    components: popSevenRandomComponents(materials)
  }
];

export default materials;
