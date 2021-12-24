export const LAMBDA = "λ" as const;

export type State<
  StateName extends string = string,
  Inputs extends string = string
> = {
  name: StateName;
  transitions: Record<Inputs, StateName[]>;
};

export type Automata<
  StateName extends string = string,
  Inputs extends string = string
> = State<StateName, Inputs>[];

function isValid(automata: State[]): boolean {
  //obtenemos los estados
  const states = automata.map((state) => state.name);
  //obtenemos los inputs
  const inputs = automata.reduce((acc, state) => {
    return [...acc, ...Object.keys(state.transitions)];
  }, [] as string[]);
  //obtenemos los estados de transicion
  const transitions = automata.reduce((acc, state) => {
    return [
      ...acc,
      ...Object.keys(state.transitions).reduce((acc, input) => {
        return [...acc, ...state.transitions[input]];
      }, [] as string[])
    ];
  }, [] as string[]);
  //verificamos que los estados no se repitan
  if (states.length !== new Set(states).size) return false;
  //verificamos que los inputs contienen las letras lambda
  if (!inputs.includes(LAMBDA)) return false;
  //verificamos la correspondencia de inputs
  //TODO: seguir por aquí
}
