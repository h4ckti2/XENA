package helpers

import (
	"math/rand"
	"time"
)

// RandomPopularDomain returns a radom domain from 'popularDomains' variable.
func RandomPopularDomain() string {
	rand.Seed(int64(time.Now().Day()) * int64(time.Now().Month()))
	return popularDomains[rand.Intn(len(popularDomains))]
}

// List of popular domains.
var popularDomains = []string{
	"wikipedia.org",
	"youtube.com",
	"amazon.com",
	"facebook.com",
	"twitter.com",
	"fandom.com",
	"pinterest.com",
	"imdb.com",
	"reddit.com",
	"yelp.com",
	"instagram.com",
	"ebay.com",
	"walmart.com",
	"craigslist.org",
	"healthline.com",
	"tripadvisor.com",
	"linkedin.com",
	"webmd.com",
	"netflix.com",
	"apple.com",
	"homedepot.com",
	"mail.yahoo.com",
	"cnn.com",
	"etsy.com",
	"google.com",
	"yahoo.com",
	"indeed.com",
	"target.com",
	"microsoft.com",
	"nytimes.com",
	"mayoclinic.org",
	"espn.com",
	"usps.com",
	"quizlet.com",
	"gamepedia.com",
	"lowes.com",
	"irs.gov",
	"nih.gov",
	"steampowered.com",
	"mapquest.com",
	"foxnews.com",
	"allrecipes.com",
	"quora.com",
	"aol.com",
	"britannica.com",
	"live.com",
	"bestbuy.com",
	"rottentomatoes.com",
	"ca.gov",
	"cnet.com",
	"roblox.com",
	"usnews.com",
	"zillow.com",
	"businessinsider.com",
	"bulbagarden.net",
	"paypal.com",
	"genius.com",
	"usatoday.com",
	"realtor.com",
	"medicalnewstoday.com",
	"fedex.com",
	"bankofamerica.com",
	"washingtonpost.com",
	"investopedia.com",
	"speedtest.net",
	"spotify.com",
	"cdc.gov",
	"chase.com",
	"hulu.com",
	"xfinity.com",
	"msn.com",
	"dictionary.com",
	"weather.com",
	"ups.com",
	"verizon.com",
	"forbes.com",
	"wowhead.com",
	"expedia.com",
	"urbandictionary.com",
	"foodnetwork.com",
	"nbcnews.com",
	"macys.com",
	"apartments.com",
	"ign.com",
	"capitalone.com",
	"costco.com",
	"theguardian.com",
	"cnbc.com",
	"glassdoor.com",
	"yellowpages.com",
	"att.com",
	"bbc.com",
	"khanacademy.org",
	"twitch.tv",
	"adobe.com",
}
