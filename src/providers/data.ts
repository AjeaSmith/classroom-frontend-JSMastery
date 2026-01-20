import { Subject } from "@/types";
import {
	BaseRecord,
	DataProvider,
	GetListParams,
	GetListResponse,
} from "@refinedev/core";

const subjects: Subject[] = [
	{
		id: 1,
		subject: "Introduction to Computer Science",
		code: "CS101",
		department: "Computer Science",
		description:
			"Introduction to computer science fundamentals including algorithms, problem-solving, and basic programming concepts.",
	},
	{
		id: 2,
		subject: "Calculus II",
		code: "MATH201",
		department: "Mathematics",
		description:
			"Intermediate calculus course covering limits, derivatives, integrals, and their applications in real-world problems.",
	},
	{
		id: 3,
		subject: "Academic Writing",
		code: "ENG150",
		department: "English",
		description:
			"Study of composition and critical reading with an emphasis on academic writing, argumentation, and literary analysis.",
	},
];
export const dataProvider: DataProvider = {
	getList: async <TData extends BaseRecord = BaseRecord>({
		resource,
	}: GetListParams): Promise<GetListResponse<TData>> => {
		if (resource !== "subjects") {
			return { data: [] as TData[], total: 0 };
		}
		return { data: subjects as unknown as TData[], total: subjects.length };
	},
	getOne: async () => {
		throw new Error("This function is not present in mock");
	},
	create: async () => {
		throw new Error("This function is not present in mock");
	},
	update: async () => {
		throw new Error("This function is not present in mock");
	},
	deleteOne: async () => {
		throw new Error("This function is not present in mock");
	},
	getApiUrl: () => "",
};
