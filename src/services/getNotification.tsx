// It Simulate how backend should filter the notification message; 

import Faker from "faker";
import { TFilter } from '../utils/project';

enum MessageType {
	Create,
	Funded,
	Milestone,
	Update,
}

type TMessageBase = {
	messageType: string;
	funding_goal: number;
	funded_percentage?: number;
}
  
const generateMessage = () => {
	const project_id = Math.floor(Math.random() * 200) + 20;
	const project_name = Faker.company.companyName();
	const creator = Faker.name.findName();
	const funding_goal = Math.floor(Math.random() * 2000000);
	const funded_percentage = Math.floor(Math.random() * 100);
	const milestone = Faker.lorem.words();
	const update_name = Faker.company.catchPhrase();

	const messageTypeInNum = Math.floor(Math.random() * 100) % 4;
	const message = {
		messageType: MessageType[messageTypeInNum],
		project_id,
		project_name,
		funding_goal,
	};
	switch (+messageTypeInNum) {
		case MessageType.Create:
			return {
				...message,
				creator,
			};

		case MessageType.Funded:
			return {
				...message,
				funded_percentage
			};

		case MessageType.Milestone:
			return {
				...message,
				milestone
			};

		default:
			return {
				...message,
				update_name
			}
	}
}

const filterMessage = (
	{messageType, funding_goal, funded_percentage}: TMessageBase, 
	{goal, funded} : TFilter
) => {
	if(funding_goal / 100 < goal[0]) {
		return false;
	}
	// upper boundry is set
	if (goal[1] > 0 && funding_goal / 100 >= goal[1]){
		return false;
	}
	// pass the checking of funded_percentage for new projects
	if (messageType === MessageType[0]){
		return true;
	}
	if (funded_percentage && funded_percentage < funded){
		return false;
	}

	return true;
}

export default (filter: TFilter) => {
	const m = generateMessage();
	return filterMessage(m, filter) ? m : null;
}