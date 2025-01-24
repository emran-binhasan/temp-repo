import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import Home from "../pages/Home/Home";
import Services from "../pages/Services/Services";
import Vision from "../pages/Vision/Vision";
import Downloads from "../pages/Downloads/Download";
import Corporate from "../pages/Corporate/Corporate";
import Directors from "../pages/Directors/Directors";
import Management from "../pages/Management/Management";
import Posts from "../pages/Posts/Posts";
import BOAccount from "../pages/BOAccount/BOAccount";
import AccountBasic from "../pages/BOAccount/account_pages/AccountBasic";
import AccountType from "../pages/BOAccount/account_pages/AccountType";
import AccountBank from "../pages/BOAccount/account_pages/AccountBank";
import AccountNominees from "../pages/BOAccount/account_pages/AccountNominees";
import AccountComplete from "../pages/BOAccount/account_pages/AccountComplete";
import Contact from "../pages/Contact/Contact";

const Router = createBrowserRouter([
	{
		path: "/",
		element: <MainLayout />,
		children: [
			{
				path: "/",
				element: <Home />,
			},
			{
				path: "/services",
				element: <Services />,
			},
			{
				path: "/vision",
				element: <Vision />,
			},
			{
				path: "/download",
				element: <Downloads />,
			},
			{
				path: "/corporate",
				element: <Corporate />,
			},
			{
				path: "/directors",
				element: <Directors />,
			},
			{
				path: "/management",
				element: <Management />,
			},
			{
				path: "/post/:id",
				element: <Posts />,
			},
			{
				path: "/contact",
				element: <Contact />,
			},
			{
				path: "/open-bo-account",
				element: <BOAccount />,
				children: [
					{
						path: "bo-type",
						element: <AccountType />,
					},
					{
						path: "basic",
						element: <AccountBasic />,
					},
					{
						path: "bank",
						element: <AccountBank />,
					},
					{
						path: "nominees",
						element: <AccountNominees />,
					},
					{
						path: "complete",
						element: <AccountComplete />,
					},
				],
			},
		],
	},
]);

export default Router;
