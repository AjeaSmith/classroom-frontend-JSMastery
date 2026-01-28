import { CreateButton } from "@/components/refine-ui/buttons/create";
import { DataTable } from "@/components/refine-ui/data-table/data-table";
import { Breadcrumb } from "@/components/refine-ui/layout/breadcrumb";
import { ListView } from "@/components/refine-ui/views/list-view";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Subject } from "@/types";
import { useList } from "@refinedev/core";
import { useTable } from "@refinedev/react-table";
import { ColumnDef } from "@tanstack/react-table";

import { Search } from "lucide-react";
import { useMemo, useState } from "react";

const SubjectsList = () => {
	const [searchQuery, setSearchQuery] = useState("");
	const [selectedDepartment, setselectedDepartment] = useState("all");

	const departmentFilters =
		selectedDepartment === "all"
			? []
			: [
					{
						field: "department",
						operator: "eq" as const,
						value: selectedDepartment,
					},
			  ];
	const searchfilters = searchQuery
		? [
				{
					field: "name",
					operator: "contains" as const,
					value: searchQuery,
				},
		  ]
		: [];
	const subjectTable = useTable<Subject>({
		columns: useMemo<ColumnDef<Subject>[]>(
			() => [
				{
					id: "code",
					accessorKey: "code",
					size: 100,
					header: () => <p className="column-title ml-2">Code</p>,
					cell: ({ getValue }) => <Badge>{getValue<string>()}</Badge>,
				},
				{
					id: "name",
					accessorKey: "name",
					size: 200,
					header: () => <p className="column-title">Name</p>,
					cell: ({ getValue }) => (
						<span className="text-foreground">{getValue<string>()}</span>
					),
					filterFn: "includesString", // enable filtering by this column
				},
				{
					id: "department",
					accessorKey: "department.name",
					size: 150,
					header: () => <p className="column-title">Department</p>,
					cell: ({ getValue }) => (
						<Badge variant="secondary">{getValue<string>()}</Badge>
					),
					filterFn: "includesString", // enable filtering by this column
				},
				{
					id: "description",
					accessorKey: "description",
					size: 300,
					header: () => <p className="column-title">Description</p>,
					cell: ({ getValue }) => <span>{getValue<string>()}</span>,
				},
			],
			[],
		),
		refineCoreProps: {
			resource: "subjects",
			pagination: { pageSize: 10, mode: "server" },
			filters: {
				permanent: [...departmentFilters, ...searchfilters],
			},
			sorters: { initial: [{ field: "id", order: "desc" }] },
		},
	});

	// ADDED: I made a API for departments '/api/departments' useList will use getList under the hood to call API. This will return all the departments for dropdown.
	const { result: departments } = useList({
		resource: "departments",
	});

	return (
		<ListView>
			<Breadcrumb />
			<h1 className="page-title">Subjects</h1>

			<div className="intro-row">
				<p>Quick access to essential metrics and management tools.</p>

				<div className="actions-row">
					<div className="search-field">
						<Search className="search-icon" />
						<Input
							type="text"
							placeholder="Search by name..."
							className="pl-10 w-full"
							value={searchQuery}
							onChange={(event) => setSearchQuery(event.target.value)}
						/>
					</div>

					<div className="flex gap-2 w-full sm:w-auto">
						<Select
							value={selectedDepartment}
							onValueChange={setselectedDepartment}
						>
							<SelectTrigger>
								<SelectValue placeholder="Filter by department" />
							</SelectTrigger>

							<SelectContent>
								<SelectItem value="all">All Departments</SelectItem>
								{departments.data.map((department) => (
									<SelectItem key={department.id} value={department.name}>
										{department.name}
									</SelectItem>
								))}
							</SelectContent>
						</Select>
						<CreateButton />
					</div>
				</div>
			</div>
			<DataTable table={subjectTable} />
		</ListView>
	);
};
export default SubjectsList;
