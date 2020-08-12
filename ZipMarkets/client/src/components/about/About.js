import React from "react"
import "./About.css"
import { Card, CardBody, CardText } from "reactstrap"

export default function About() {
    return (
        <>
        <main className="about-main-container">
                <div className="title-container">
                    <h1>About Zip Markets</h1>
                </div>
                <Card>
                    <CardBody>
                        <CardText>
                            <p>
                                Zip Markets is a housing market tracking application allowing you to view housing market statistics for over 30,000 US zip codes.
                                Whether you are an investor, looking to purchase your first home, or moving to a new area in the country, Zip Markets provides you with
                                local zip code home appreciation data to identify worthwhile markets to invest in.
                            </p>
                            <div>
                                <h2>Methodologies</h2>
                                    <p>There are several methodologies used to measure aggregate home pricing in a given area. Zip Markets utilizes two of those
                                        methods including: Repeat Sales and Average or Median
                                    </p>
                                <h5>Repeat Sales</h5>
                                    <p>The repeated sale methodology focuses on homes that have sold more than once over a given time period. By calculating the
                                        appreciation of a given home's price after a sale, that value can be averaged with other homes to determine an aggregate
                                        home appreciation rate for a given area.
                                    </p>
                                    <p>
                                        The Federal Housing Finance Agency (FHFA) publishes annual reports on the repeated sale value for all US zip codes in the form
                                        of a Home Price Index (HPI). This information is gathered from homes whose mortgages have been purchased by Frannie Mae or Freddie
                                        Mac. Zip Markets displays HPI data for each individual zip code for the last 20 years compared to the US average.
                                    </p>
                                <h5>Average or Median</h5>
                                    <p>
                                        The average/median methodology simply takes the average or median of all observed home prices in a given area. This is typically
                                        calculated when a house is sold or refinanced. 
                                    </p>
                                    <p>
                                        Zillow's research division publishes monthly reports of the Zillow Home Value Index (ZHVI) for all U.S. zip codes. Zillow calculates ZHVI
                                        through a variety of machine learning models and data sources to return an overal price for a given set of homes. In this way, the average home
                                        price for an area is weighted depending on many factors allowing for more accurate pricing by location. Zip Markets displays this data
                                        for each individual zip code for the last 20 years compared to the US Average

                                    </p>
                                <h2>Sources</h2>
                                <h5>Data</h5>
                                    <ul>
                                        <li>Federal Housing Finance Agency - <a href="https://www.fhfa.gov/DataTools/Downloads/Pages/House-Price-Index.aspx">https://www.fhfa.gov/DataTools/Downloads/Pages/House-Price-Index.aspx</a></li>
                                        <li>Zillow Research - <a href="https://www.zillow.com/research/data/">https://www.zillow.com/research/data/</a></li>
                                        <li>Missouri Economic Reasearch and Information Center - <a href="https://meric.mo.gov/data/cost-living-data-series">https://meric.mo.gov/data/cost-living-data-series</a></li>
                                    </ul>
                                <h5>Research</h5>
                                    <ul>
                                        <li>Jordan Rappaport - Federal Reserve Bank of Kansas City = <a href="https://www.kansascityfed.org/PUBLICAT/ECONREV/PDF/2q07rapp.pdf">https://www.kansascityfed.org/PUBLICAT/ECONREV/PDF/2q07rapp.pdf</a> </li>
                                    </ul>
                                <h5>Images and Logo</h5>
                                    <ul>
                                        <li>House Icon <a href="https://www.flaticon.com/authors/freepik" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon"> www.flaticon.com</a></li>
                                        <li>Gear Icon <a href="http://www.freepik.com/" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></li>
                                        <li>Info Icon <a href="https://www.flaticon.com/authors/those-icons" title="Those Icons">Those Icons</a> from <a href="https://www.flaticon.com/" title="Flaticon"> www.flaticon.com</a></li>
                                    </ul>
                            </div>
                        </CardText>
                    </CardBody>
                </Card>

        </main>
        </>
    )
}