import { Refine } from "@refinedev/core";
import { DevtoolsPanel, DevtoolsProvider } from "@refinedev/devtools";
import { RefineKbar, RefineKbarProvider } from "@refinedev/kbar";

import routerProvider, {
	DocumentTitleHandler,
	UnsavedChangesNotifier,
} from "@refinedev/react-router";
import { BrowserRouter, Outlet, Route, Routes } from "react-router";
import "./App.css";
import { Toaster } from "./components/refine-ui/notification/toaster";
import { useNotificationProvider } from "./components/refine-ui/notification/use-notification-provider";
import { ThemeProvider } from "./components/refine-ui/theme/theme-provider";
import { dataProvider } from "./providers/data";
import Dashboard from "./pages/dashboard";
import {
	BookOpen,
	ClipboardCheck,
	GraduationCap,
	Home,
	Newspaper,
	Users,
} from "lucide-react";
import { Layout } from "./components/refine-ui/layout/layout";
import SubjectsList from "./pages/subjects/list";
import SubjectsCreate from "./pages/subjects/create";

function App() {
	return (
		<BrowserRouter>
			<RefineKbarProvider>
				<ThemeProvider>
					<DevtoolsProvider>
						<Refine
							dataProvider={dataProvider}
							notificationProvider={useNotificationProvider()}
							routerProvider={routerProvider}
							options={{
								syncWithLocation: true,
								warnWhenUnsavedChanges: true,
								projectId: "95gv51-Gozd0k-ddU5N6",
							}}
							resources={[
								{
									name: "dashboard",
									list: "/",
									meta: { label: "Home", icon: <Home /> },
								},
								{
									name: "departments",
									list: "/departments",
									meta: { label: "Departments", icon: <Newspaper /> },
								},
								{
									name: "subjects",
									list: "/subjects",
									create: "/subjects/create",
									meta: { label: "Subjects", icon: <BookOpen /> },
								},
								{
									name: "faculty",
									list: "/faculty",
									meta: { label: "Faculty", icon: <Users /> },
								},
								{
									name: "enrollments",
									list: "/enrollments",
									meta: { label: "Enrollments", icon: <ClipboardCheck /> },
								},
								{
									name: "classes",
									list: "/classes",
									meta: { label: "Classes", icon: <GraduationCap /> },
								},
							]}
						>
							<Routes>
								{/* this is sidebar that will be displayed on each page */}
								<Route
									element={
										<Layout>
											<Outlet />
										</Layout>
									}
								>
									<Route index element={<Dashboard />} />

									<Route path="subjects">
										<Route index element={<SubjectsList />} />
										<Route path="create" element={<SubjectsCreate />} />
									</Route>

									<Route path="/department" element={<p>Department</p>} />
								</Route>
							</Routes>
							<Toaster />
							<RefineKbar />
							<UnsavedChangesNotifier />
							<DocumentTitleHandler />
						</Refine>
						<DevtoolsPanel />
					</DevtoolsProvider>
				</ThemeProvider>
			</RefineKbarProvider>
		</BrowserRouter>
	);
}

export default App;
