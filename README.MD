**IMPORTANT**: For me to truly benefit from this course, I need to understand the parts I don't. These are note I took from the **PERN** stack course by JS Mastery.

## Admin dashboard created with the PERN Stack

## Tools used:

- Refine
- Tweakcn
- CodeRabbit for code reviews

### Refine Notes

**What is Refine?**

It is a React based framework to help build Dashboards, Panels, Ecommerce site and more. It provides built-in functionality that a typical Dashbaord/panel would need. You can choose the UI framework (e.g shadcn) and the database.

**How does Refine work?**

- Refine needs a data provider, which is a function that implements the `DataProvider` interface. The methods within your data provider, calls your API.
- Refine also provides data hooks (`useList`, `useCreate` etc.) that calls your data provider methods under the hood.

**useTable from react-table**
`useTable` is a react Tanstack table function that is collaborated with Refine to help render data from API. It comes with filtering, sorting and pagination functionalities built-in. It uses the `useList` hook under the hood to fetch data.

**Explain what this code does**

```js
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
```

This creates a filter rule for the `useTable` function:
no filters are applied if department is "all".

`field`: which field to filter on → "department"

`operator`: "eq" → equals

`value`: the selected department (e.g. "HR", "Engineering")

Meaning:
“Only show records where department === selectedDepartment”

**DataProvider**
When creating a custom data provider, Refine requires you to implement these methods. They will be used to fetch data from API.

```js
export const dataProvider: DataProvider = {
	getList: async () => {
        // Fetching data implementation goes here
	},
    getOne: async () => {
		// Fetch data by ID implementation goes here
	},
	create: async () => {
		// creating data implementation goes here
	},
	update: async () => {
		// updating data implementation goes here
	},
	deleteOne: async () => {
		// deleting data implementation goes here
	},
    // returns API url
	getApiUrl: () => "",
}
```

### React Notes

**What is Tweakcn?**
A Website used to finely customize your shadcn theme.

**How does useMemo work in React?**
`useMemo` is a React Hook used to memoize a value so it doesn’t get recomputed on every render unless its dependencies change.

For example:

Without `useMemo` items are filtered on every render even if items dont change.
```js
function Component({ items }) {
  const filtered = items.filter(item => item.active);
  return <List data={filtered} />;
}
```

with `useMemo` react caches the result of filter and will only run if items change.

```js
function Component({ items }) {
	const filtered = useMemo(() => {
		return items.filter((item) => item.active);
	}, [items]);

	return <List data={filtered} />;
}
```
