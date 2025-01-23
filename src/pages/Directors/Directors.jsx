import React from "react";
import useScrollToTop from "../../utils/useScrollToTop";
import useScroll from "../../utils/useScroll";
import banner from "../../assets/images/banners/director.jpg";
import useTitle from "../../utils/useTitle";

import one from "../../assets/images/director/1.png";
import two from "../../assets/images/director/2.png";
import three from "../../assets/images/director/3.jpg";
import four from "../../assets/images/director/4.png";
import Markdown from "../../utils/Markdown";

/* ------ TODO: delete this code when you ar fetching data from server ------ */
const data = [
	{
		id: 1,
		image: one,
		des: `# Mr. A. M. Ziauddin Khan, Chairman
Chairman, A K Khan & Company Limited
Member, Bangladesh Institute of Planners
Management Experience in Textile & Garments, Hospitality Industry
Committee Member, A L Khan High School, Mohora, Ctg.

## Key Facts:

- Master of Science [MSC], Development & Planning, UCL, UK
- Master of Commerce [M. COM.], Chittagong University
- Bachelor of Commerce [B. COM.], Chittagong University`,
	},
	{
		id: 2,
		image: two,
		des: `# Mr. Salahuddin Kasem Khan, Former Managing Director
Mr. Salahuddin Kasem Khan is third son of pioneer industrialist of Bangladesh, Late A. K. Khan, who was the Member of Parliament from 1947 – 1962, former Federal Minister of Government of Pakistan (1958 – 1962). He did his schooling from Aitchison College, Lahore, 1964; Graduated from the University of Punjab in 1968 and did Post Graduate in Legal Studies in London (1969 – 1972). Mr.Khan was appointed as Honorary Consul General of the Republic of Turkey, Chittagong by the President of Turkey in 1984.
 

## Key Facts:

- Former Managing Director of A. K. Khan & Co. Ltd.
- Chairman of Coats (Bangladesh) Ltd., a joint venture with Coats U.K.
- Chairman A. K. Khan Jute Mills
- Vice Chairman of A. K. Khan Penfabric Company Ltd., A JV with Penfabric Malaysia of Malaysia and subsidiary of Toray, Japan
- Director of Bengal Fisheries Ltd., joint ventures with Nichiro & Maruha of Japan
- Former Chairman of AKTEL, Bangladesh.`,
	},
	{
		id: 3,
		image: three,
		des: `# Mr. Mujtaba Ali Khan, Director
## Key Facts:

Master of Business Administration (Management) from INSEAD
Bachelor’s Degree in Economics and Finance from McGill University`,
	},
	{
		id: 4,
		image: four,
		des: `# Dr. Muhammad Abdul Mazid, Adviser
Chief Coordinator, Diabetic Association of Bangladesh (2010 – 2017) 
Chairman, Chittagong Stock Exchanges Limited (2014 – 2017) 
Chairman, South Asian Federation of Exchanges (2014 – 2017) 
Secretary to the Government of Bangladesh, Internal Resources Division (IRD), Ministry of Finance

## Key Facts:

- Doctor of Philosophy in Social Science 2009, Victoria University, Delaware, USA
- B.A.(Hons) M.A. in English literature , Dhaka University
### Professional Career: Chairman, National Board of Revenue(NBR) (2007 – 2009)

- Member, Physical Infrastructure Division and Power Sector Planning Commission (2007 – 2009)
- Additional Secretary, Banking Wing, Finance Division, Ministry of Finance (2005 – 2007)
- Deputy and Joint Secretary, Budget wing, Finance Division, Ministry of Finance (2002 – 2005)
- Director, Policy and Planning &Foreign Investment, Board of Investment Prime Minister’s Office (2000 – 2002)
- Commercial Counsellor, Bangladesh Embassy Tokyo, Japan (1994 – 2000)
- Director, Foreign Aid Budget and Accounts Economic Relations Division (ERD), Ministry of Finance (1990 – 1994)
- National Project Director, Debt Management and Financial Analysis, System Project (a UNCTAD project and sponsored by local UNDP , BGD/88/058) (1990 – 1994)
- Director, Civil Audit Directorate, Bangladesh Audit Department (1990 – 1990)
- Chief Accounts Officer, Internal Resources Division Ministry of Finance (1986 – 1990)
- Joined BCS Audit and Accounts Cadre and worked as AAG and DAG ( 1981 -1985)
- Started career in Bangladesh Bank ( 1974-1980)`,
	},
];

const Directors = () => {
	const isScrolled = useScroll("top-navbar");
	useScrollToTop();
	useTitle("Board of Directors");

	return (
		<div className="">
			<div className={`h-72 w-full overflow-hidden ${isScrolled ? "" : ""}`}>
				<img
					src={banner}
					alt="banner"
					className={`object-cover w-full h-full duration-700
                        ${isScrolled ? "scale-105" : "scale-100"}`}
				/>
			</div>
			<div className="flex flex-col px-4 lg:mx-16 gap-y-28">
				<h1 className="text-[2.63rem] mt-8 font-medium uppercase text-center w-full whitespace-nowrap text-black mb-8">
					Board of Directors
				</h1>
				{data.map((tab) => (
					<div
						key={tab.label}
						className="flex flex-col lg:flex-row gap-x-16 gap-y-4"
					>
						<img
							src={tab.image}
							className="h-auto block lg:mx-0 mx-auto w-auto max-w-[200px] max-h-[200px] object-cover"
						/>
						<div className="flex flex-col justify-start gap-y-4">
							<Markdown content={tab.des} />
						</div>
					</div>
				))}
			</div>
		</div>
	);
};

export default Directors;
