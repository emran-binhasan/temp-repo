import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import img1 from "../../assets/images/marquee/1.jpeg";
import img2 from "../../assets/images/marquee/2.jpeg";
import img3 from "../../assets/images/marquee/3.jpeg";
import img4 from "../../assets/images/marquee/4.jpeg";
import banner from "../../assets/images/banners/ipo.jpg";
import Markdown from "../../utils/Markdown";

const data = [
	{
		id: 1,
		title: "Brokerage Service",
		image: img1,
		body: "A. K. Khan Securities Limited is dedicated to delivering excellence in brokerage services, offering exciting prospects to both individual and institutional investors. Regardless of your trading frequency or the size of your account, entrusting us with your investments ensures you receive the utmost care and attention. We are committed to providing unparalleled service and opportunities that align with your financial aspirations.With A. K. Khan Securities, your investment journey is in safe hands.",
	},
	{
		id: 2,
		title: "IPO Application",
		image: img2,
		body: "Embark on an investment journey in the flourishing stock market of Bangladesh with IPO Application - your ultimate gateway to accessing and applying for exciting Initial Public Offerings.Our intuitive platform allows you to effortlessly explore the latest IPOs, analyze company profiles, and submit applications seamlessly. Don't let this chance slip away to be a part of Bangladesh's thriving investment landscape.Join IPO Application now and confidently build your portfolio for a prosperous future.",
	},
	{
		id: 3,
		title: "DP Service",
		image: img3,
		body: `### Best Approach to Security Consultancy \n Join thousands of satisfied investors who trust DP Service to navigate the complex world of stocks with ease. Don’t miss out on lucrative opportunities – start your journey toward financial freedom today with DP Service. \n### Financial Analysis \n Financial analysis plays a vital role in driving strategic decisions and ensuring sustainable growth. If you need insights, tools, or specific methodologies to enhance your work, feel free to ask!`,
	},
	{
		id: 4,
		title: "Margin Loan Facilities",
		image: img4,
		body: "Unlock the potential of your stock market investments with our cutting-edge Margin Loan Facilities tailored for the dynamic stock market in Bangladesh.Empower yourself to seize profitable opportunities and maximize returns. With flexible terms and competitive interest rates, leverage your existing portfolio to amplify your investment power.Don’t let financial constraints hold you back – capitalize on the market’s potential with our Margin Loan Facilities and elevate your investment journey to new heights. Contact us today to get started.",
	},
];

const SearchResults = () => {
	const location = useLocation();
	const query = new URLSearchParams(location.search).get("query");
	const [results, setResults] = useState([]);

	useEffect(() => {
		if (query) {
			// Search for items that include the query (case-insensitive)
			const filteredResults = data.filter((item) =>
				item.title.toLowerCase().includes(query.toLowerCase())
			);
			setResults(filteredResults);
		}
	}, [query]);

	return (
		<div className="p-6 mt-20">
			<h1 className="text-2xl font-semibold mb-4">Search Results for "{query}"</h1>

			{results.length > 0 ? (
				<div className="">
					{results.map((item) => (
						<div
							key={item.id}
							className="border rounded-lg p-4 w-full"
						>
							<img
								src={item.image}
								alt={item.title}
								className="w-full h-40 object-cover mb-2"
							/>
							<h2 className="text-xl font-semibold">{item.title}</h2>
							<Markdown content={item.body} />
						</div>
					))}
				</div>
			) : (
				<p className="text-gray-500">No results found.</p>
			)}
		</div>
	);
};

export default SearchResults;
