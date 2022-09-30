type GetSuggestions = (query?: string, options?: string[]) => string[];

type CreateSuggestions = (query?: string) => string[] | string;

type Command<ParametersType = Record<string, string> | undefined> = (
	node: SceneNode,
	parameters: RunEvent<ParametersType>['parameters']
) => void;
