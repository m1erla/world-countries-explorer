import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styles from "./CountryDetailsScreen.module.css";
import type { Country } from "../types/country";
import { IoArrowBack } from "react-icons/io5";

export interface TouristInfo {
  attractions: Array<{
    name: string;
    description: string;
    image?: string;
    details?: string;
  }>;
  culturalNotes: Array<{
    title: string;
    description: string;
    details?: string;
  }>;
  practicalInfo: Array<{
    title: string;
    details: string;
    additionalInfo?: string;
  }>;
  currencyCode: string;
}

export const getCountrySpecificInfo = (countryName: string): TouristInfo => {
  const countryData: { [key: string]: TouristInfo } = {
    Turkey: {
      attractions: [
        {
          name: "Tourist Attractions",
          description:
            "Visit the iconic Hagia Sophia, explore the ancient ruins of Ephesus, and wander through the Grand Bazaar in Istanbul.",
          image:
            "https://images.unsplash.com/photo-1541432901042-2d8bd64b4a9b?auto=format&fit=crop&q=80", // Hagia Sophia
        },
        {
          name: "Natural Beauty",
          description:
            "Experience the surreal landscapes of Cappadocia, the cotton castles of Pamukkale, and the beautiful beaches of the Turkish Riviera.",
          image:
            "https://images.unsplash.com/photo-1641128324972-af3212f0f6bd?auto=format&fit=crop&q=80", // Cappadocia hot air balloons
        },
      ],
      culturalNotes: [
        {
          title: "Local Culture",
          description:
            "Experience Turkish hospitality, traditional hammams, and the art of carpet weaving.",
        },
        {
          title: "Food Culture",
          description:
            "Savor kebabs, Turkish delight, baklava, and authentic Turkish coffee.",
        },
      ],
      practicalInfo: [
        {
          title: "Best Time to Visit",
          details:
            "Spring (April-May) and Autumn (September-October) offer mild weather perfect for sightseeing.",
        },
        {
          title: "Transportation",
          details:
            "Well-connected airports, extensive bus network, and high-speed trains between major cities.",
        },
        {
          title: "Accommodation",
          details:
            "From luxury hotels to boutique cave hotels in Cappadocia and traditional guesthouses.",
        },
      ],
      currencyCode: "TRY",
    },
    Japan: {
      attractions: [
        {
          name: "Tourist Attractions",
          description:
            "Visit ancient temples in Kyoto, explore Tokyo's modern districts, and see the iconic Mount Fuji.",
          image:
            "https://images.unsplash.com/photo-1545569341-9eb8b30979d9?auto=format&fit=crop&q=80", // Temple in Kyoto
        },
        {
          name: "Natural Beauty",
          description:
            "Experience cherry blossoms in spring, autumn colors, and serene Japanese gardens.",
          image:
            "https://images.unsplash.com/photo-1528164344705-47542687000d?auto=format&fit=crop&q=80", // Mount Fuji
        },
      ],
      culturalNotes: [
        {
          title: "Local Culture",
          description:
            "Experience tea ceremonies, traditional arts like origami, and unique customs.",
        },
        {
          title: "Food Culture",
          description:
            "Try sushi, ramen, tempura, and various regional specialties.",
        },
      ],
      practicalInfo: [
        {
          title: "Best Time to Visit",
          details:
            "Spring for cherry blossoms (March-April) or autumn for fall colors (November).",
        },
        {
          title: "Transportation",
          details:
            "Efficient rail system with JR Pass options, metro in major cities.",
        },
        {
          title: "Accommodation",
          details:
            "Traditional ryokans, capsule hotels, and modern accommodations.",
        },
      ],
      currencyCode: "JPY",
    },
    France: {
      attractions: [
        {
          name: "Tourist Attractions",
          description:
            "Visit the magnificent Arc de Triomphe, explore the Louvre Museum, stroll down the Champs-Élysées, and discover Notre-Dame Cathedral.",
          image:
            "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?auto=format&fit=crop&q=80", // Arc de Triomphe
        },
        {
          name: "Natural Beauty",
          description:
            "Explore the French Riviera, Loire Valley châteaux, and the French Alps.",
          image:
            "https://images.unsplash.com/photo-1533104816931-20fa691ff6ca?auto=format&fit=crop&q=80", // French Riviera
        },
      ],
      culturalNotes: [
        {
          title: "Local Culture",
          description:
            "Experience French art de vivre, café culture, and fashion.",
        },
        {
          title: "Food Culture",
          description: "Enjoy French cuisine, wine tasting, and patisseries.",
        },
      ],
      practicalInfo: [
        {
          title: "Best Time to Visit",
          details:
            "Spring (April-June) or Fall (September-October) for mild weather.",
        },
        {
          title: "Transportation",
          details:
            "Efficient TGV train network, metro in Paris, and regional trains.",
        },
        {
          title: "Accommodation",
          details:
            "From luxury hotels to charming bed & breakfasts and apartments.",
        },
      ],
      currencyCode: "EUR",
    },
    Italy: {
      attractions: [
        {
          name: "Historical Landmarks",
          description:
            "Visit the iconic Colosseum, explore Vatican City, marvel at the Leaning Tower of Pisa, and wander through the ruins of Pompeii.",
          image:
            "https://images.unsplash.com/photo-1552832230-c0197dd311b5?auto=format&fit=crop&q=80", // Colosseum
        },
        {
          name: "Art & Architecture",
          description:
            "Experience the Renaissance art in Florence, cruise through Venice's canals, and admire the Sistine Chapel.",
          image:
            "https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?auto=format&fit=crop&q=80", // Venice
        },
      ],
      culturalNotes: [
        {
          title: "Italian Lifestyle",
          description:
            "Experience 'la dolce vita', afternoon aperitivo, and the passionate Italian way of life.",
        },
        {
          title: "Culinary Excellence",
          description:
            "Savor authentic pasta, pizza, gelato, and regional specialties from each unique region.",
        },
      ],
      practicalInfo: [
        {
          title: "Best Time to Visit",
          details:
            "Spring (April-May) and Fall (September-October) offer pleasant weather and fewer tourists.",
        },
        {
          title: "Transportation",
          details:
            "Extensive train network connecting major cities, efficient local buses, and water taxis in Venice.",
        },
        {
          title: "Accommodation",
          details:
            "From historic hotels to agriturismos in Tuscany and boutique B&Bs.",
        },
      ],
      currencyCode: "EUR",
    },
    Spain: {
      attractions: [
        {
          name: "Architectural Wonders",
          description:
            "Marvel at the magnificent Plaza de España in Seville, explore the Royal Palace in Madrid, and visit the historic Toledo.",
          image:
            "https://images.unsplash.com/photo-1555881400-74d7acaacd8b?auto=format&fit=crop&q=80", // Plaza de España
        },
        {
          name: "Coastal Beauty",
          description:
            "Relax on Costa del Sol beaches, visit the Balearic Islands, and explore the rugged coastline of the North.",
          image:
            "https://images.unsplash.com/photo-1504019347908-b45f9b0b8dd5?auto=format&fit=crop&q=80", // Spanish Coast
        },
      ],
      culturalNotes: [
        {
          title: "Spanish Lifestyle",
          description:
            "Experience siesta culture, late-night dining, flamenco shows, and vibrant festivals.",
        },
        {
          title: "Gastronomy",
          description:
            "Try tapas, paella, jamón ibérico, and regional wines from Rioja and Ribera del Duero.",
        },
      ],
      practicalInfo: [
        {
          title: "Best Time to Visit",
          details:
            "Spring and Fall are ideal, avoiding the intense summer heat of July-August.",
        },
        {
          title: "Transportation",
          details:
            "High-speed AVE trains, extensive bus network, and efficient metro systems in major cities.",
        },
        {
          title: "Accommodation",
          details:
            "Historic paradores, modern hotels, and charming pensiones in old town centers.",
        },
      ],
      currencyCode: "EUR",
    },
    Greece: {
      attractions: [
        {
          name: "Ancient Wonders",
          description:
            "Explore the Acropolis in Athens, visit ancient Delphi, and discover the Palace of Knossos in Crete.",
          image:
            "https://images.unsplash.com/photo-1603565816030-6b389eeb23cb?auto=format&fit=crop&q=80", // Acropolis
        },
        {
          name: "Island Paradise",
          description:
            "Visit the white-washed buildings of Santorini, relax on Mykonos beaches, and explore Rhodes' medieval city.",
          image:
            "https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e?auto=format&fit=crop&q=80", // Santorini
        },
      ],
      culturalNotes: [
        {
          title: "Greek Culture",
          description:
            "Experience philoxenia (hospitality), traditional music and dance, and village life.",
        },
        {
          title: "Mediterranean Cuisine",
          description:
            "Enjoy moussaka, souvlaki, fresh seafood, and traditional Greek mezedes.",
        },
      ],
      practicalInfo: [
        {
          title: "Best Time to Visit",
          details:
            "Late spring and early fall offer perfect weather for both sightseeing and beach activities.",
        },
        {
          title: "Transportation",
          details:
            "Ferries connecting islands, domestic flights, and buses on mainland Greece.",
        },
        {
          title: "Accommodation",
          details:
            "Luxury resorts, traditional guesthouses, and family-run hotels with stunning views.",
        },
      ],
      currencyCode: "EUR",
    },
    Egypt: {
      attractions: [
        {
          name: "Ancient Wonders",
          description:
            "Visit the Great Pyramids of Giza, explore the Valley of the Kings, and marvel at the Sphinx.",
          image:
            "https://images.unsplash.com/photo-1539650116574-8efeb43e2750?auto=format&fit=crop&q=80", // Pyramids
        },
        {
          name: "Nile Experience",
          description:
            "Cruise down the Nile River, visit Abu Simbel temples, and explore the bustling markets of Cairo.",
          image:
            "https://images.unsplash.com/photo-1553913861-c0fddf2619ee?auto=format&fit=crop&q=80", // Nile River
        },
      ],
      culturalNotes: [
        {
          title: "Egyptian Heritage",
          description:
            "Experience ancient Egyptian history, Islamic culture, and traditional Nubian villages.",
        },
        {
          title: "Local Cuisine",
          description:
            "Try koshari, ful medames, shawarma, and traditional Egyptian desserts.",
        },
      ],
      practicalInfo: [
        {
          title: "Best Time to Visit",
          details:
            "October to April offers cooler temperatures ideal for sightseeing.",
        },
        {
          title: "Transportation",
          details:
            "Domestic flights, trains along the Nile Valley, and Nile cruise boats.",
        },
        {
          title: "Accommodation",
          details:
            "Luxury Nile cruises, historic hotels, and desert camps under the stars.",
        },
      ],
      currencyCode: "EGP",
    },
    "United Kingdom": {
      attractions: [
        {
          name: "Historic London",
          description:
            "Visit Big Ben, Tower of London, Buckingham Palace, and explore the British Museum.",
          image:
            "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&q=80", // London
        },
        {
          name: "British Heritage",
          description:
            "Explore the mysterious Stonehenge, discover the charming Cotswolds villages, and visit the Roman Baths.",
          image:
            "https://images.unsplash.com/photo-1599833975787-5c143f373c30?auto=format&fit=crop&q=80", // Stonehenge
        },
      ],
      culturalNotes: [
        {
          title: "British Culture",
          description:
            "Experience afternoon tea, pub culture, Premier League football, and royal traditions.",
        },
        {
          title: "British Cuisine",
          description:
            "Try fish and chips, Sunday roast, full English breakfast, and traditional afternoon tea.",
        },
      ],
      practicalInfo: [
        {
          title: "Best Time to Visit",
          details:
            "May to September offers warmer weather and longer daylight hours.",
        },
        {
          title: "Transportation",
          details:
            "Extensive rail network, London Underground, and regular bus services nationwide.",
        },
        {
          title: "Accommodation",
          details:
            "Historic hotels, cozy B&Bs, countryside manors, and modern city apartments.",
        },
      ],
      currencyCode: "GBP",
    },
    China: {
      attractions: [
        {
          name: "Imperial Wonders",
          description:
            "Walk the Great Wall, explore the Forbidden City, and see the Terracotta Warriors in Xi'an.",
          image:
            "https://images.unsplash.com/photo-1508804185872-d7badad00f7d?auto=format&fit=crop&q=80", // Great Wall
        },
        {
          name: "Natural Scenery",
          description:
            "Visit the karst mountains of Guilin, the pandas in Chengdu, and cruise the Yangtze River.",
          image:
            "https://images.unsplash.com/photo-1537210249814-b9a10a161ae4?auto=format&fit=crop&q=80", // Guilin
        },
      ],
      culturalNotes: [
        {
          title: "Chinese Culture",
          description:
            "Experience traditional tea ceremonies, calligraphy, martial arts, and ancient philosophy.",
        },
        {
          title: "Culinary Traditions",
          description:
            "Sample Peking duck, dim sum, hot pot, and regional specialties from different provinces.",
        },
      ],
      practicalInfo: [
        {
          title: "Best Time to Visit",
          details:
            "Spring (March-May) and Autumn (September-October) offer comfortable temperatures and less rain.",
        },
        {
          title: "Transportation",
          details:
            "High-speed rail network, efficient metro systems, and domestic flights between cities.",
        },
        {
          title: "Accommodation",
          details:
            "International hotel chains, traditional courtyard hotels, and modern city hotels.",
        },
      ],
      currencyCode: "CNY",
    },
    India: {
      attractions: [
        {
          name: "Iconic Landmarks",
          description:
            "Marvel at the Taj Mahal, explore the palaces of Rajasthan, and visit the holy city of Varanasi.",
          image:
            "https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&q=80", // Taj Mahal
        },
        {
          name: "Cultural Heritage",
          description:
            "Experience the backwaters of Kerala, the beaches of Goa, and the Himalayan landscapes.",
          image:
            "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&q=80", // Kerala Backwaters
        },
      ],
      culturalNotes: [
        {
          title: "Indian Culture",
          description:
            "Experience yoga and meditation, colorful festivals, classical dance, and spiritual traditions.",
        },
        {
          title: "Indian Cuisine",
          description:
            "Enjoy diverse regional cuisines, street food, curries, and traditional thali meals.",
        },
      ],
      practicalInfo: [
        {
          title: "Best Time to Visit",
          details:
            "October to March offers pleasant weather across most of the country.",
        },
        {
          title: "Transportation",
          details:
            "Extensive rail network, domestic flights, and local auto-rickshaws in cities.",
        },
        {
          title: "Accommodation",
          details:
            "Heritage palaces, modern hotels, eco-resorts, and traditional homestays.",
        },
      ],
      currencyCode: "INR",
    },
    Brazil: {
      attractions: [
        {
          name: "Natural Wonders",
          description:
            "Explore the Amazon Rainforest, witness Iguazu Falls, and relax on Copacabana Beach in Rio.",
          image:
            "https://images.unsplash.com/photo-1516306580123-e6e52b1b7b5f?auto=format&fit=crop&q=80", // Rio
        },
        {
          name: "Cultural Sites",
          description:
            "Visit Christ the Redeemer, experience Carnival, and explore colonial Salvador.",
          image:
            "https://images.unsplash.com/photo-1483729558449-99ef09a8c325?auto=format&fit=crop&q=80", // Christ the Redeemer
        },
      ],
      culturalNotes: [
        {
          title: "Brazilian Culture",
          description:
            "Experience samba dancing, football passion, beach culture, and vibrant festivals.",
        },
        {
          title: "Local Cuisine",
          description:
            "Try feijoada, churrasco, açaí bowls, and traditional Brazilian barbecue.",
        },
      ],
      practicalInfo: [
        {
          title: "Best Time to Visit",
          details:
            "December to March for beaches and Carnival, or May to September for drier weather.",
        },
        {
          title: "Transportation",
          details:
            "Domestic flights between major cities, buses for regional travel, and metro in larger cities.",
        },
        {
          title: "Accommodation",
          details:
            "Beachfront resorts, boutique hotels in historic areas, and Amazon eco-lodges.",
        },
      ],
      currencyCode: "BRL",
    },
    "United States": {
      attractions: [
        {
          name: "Urban Landmarks",
          description:
            "Experience the bright lights of New York City with its iconic Statue of Liberty and Times Square, explore the historic streets of Washington D.C., and discover the glamour of Los Angeles.",
          image:
            "https://images.unsplash.com/photo-1485871981521-5b1fd3805eee?auto=format&fit=crop&q=80", // New York City skyline
        },
        {
          name: "Natural Wonders",
          description:
            "Marvel at the Grand Canyon, witness the geysers of Yellowstone National Park, and explore the diverse landscapes from Yosemite to the Great Smoky Mountains.",
          image:
            "https://images.unsplash.com/photo-1474044159687-1ee9f3a51722?auto=format&fit=crop&q=80", // Grand Canyon
        },
      ],
      culturalNotes: [
        {
          title: "American Culture",
          description:
            "Experience the diversity of American culture, from jazz in New Orleans and country music in Nashville to Hollywood movies and Broadway shows.",
        },
        {
          title: "Food Scene",
          description:
            "Savor diverse cuisines from New York pizza and Philly cheesesteaks to Texas BBQ, Cajun food, and California's farm-to-table movement.",
        },
      ],
      practicalInfo: [
        {
          title: "Best Time to Visit",
          details:
            "Varies by region - Spring and Fall for most areas, Winter for skiing, Summer for national parks and beaches.",
        },
        {
          title: "Transportation",
          details:
            "Extensive air network, interstate highways, Amtrak trains, and public transportation in major cities.",
        },
        {
          title: "Accommodation",
          details:
            "From luxury resorts and boutique hotels to roadside motels, vacation rentals, and camping in national parks.",
        },
      ],
      currencyCode: "USD",
    },
    // Diğer ülkeler için benzer şekilde devam edebiliriz...
  };

  return (
    countryData[countryName] || {
      attractions: [
        {
          name: "Tourist Attractions",
          description:
            "Explore the most popular tourist attractions and historical sites in this country.",
          image:
            "https://images.unsplash.com/photo-1495562569060-2eec283d3391?auto=format&fit=crop&q=80",
        },
        {
          name: "Natural Beauty",
          description:
            "Discover national parks, landscapes, and natural wonders.",
          image:
            "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&q=80",
        },
      ],
      culturalNotes: [
        {
          title: "Local Culture",
          description:
            "Learn about local traditions, customs, and cultural experiences.",
        },
        {
          title: "Food Culture",
          description: "Experience local cuisine and dining traditions.",
        },
      ],
      practicalInfo: [
        {
          title: "Best Time to Visit",
          details: "Find the ideal season for your visit.",
        },
        {
          title: "Transportation",
          details: "Available transportation options within the country.",
        },
        {
          title: "Accommodation",
          details: "Various accommodation options for different budgets.",
        },
      ],
      currencyCode: "USD",
    }
  );
};

export const CountryDetailsScreen: React.FC = () => {
  const { countryName } = useParams();
  const navigate = useNavigate();
  const [touristInfo, setTouristInfo] = useState<TouristInfo | null>(null);
  const [loading, setLoading] = useState(true);

  const handleCardClick = (type: string, index: number) => {
    navigate(`/country/${countryName}/${type}/${index}`);
  };

  useEffect(() => {
    const fetchCountryDetails = async () => {
      try {
        setLoading(true);
        if (countryName) {
          const countryInfo = getCountrySpecificInfo(countryName);
          setTouristInfo(countryInfo);
        }
        setLoading(false);
      } catch (error) {
        console.error("Error fetching country details:", error);
        setLoading(false);
      }
    };

    if (countryName) {
      fetchCountryDetails();
    }
  }, [countryName]);

  if (loading) {
    return (
      <div className={styles.loadingContainer}>
        <p>Loading country details...</p>
      </div>
    );
  }

  return (
    <div className={styles.pageBackground}>
      <div className={styles.container}>
        <button className={styles.backButton} onClick={() => navigate(-1)}>
          <IoArrowBack /> Back
        </button>

        <h1 className={styles.title}>{countryName}</h1>

        <div className={styles.content}>
          {touristInfo?.attractions.map((attraction, index) => (
            <section key={index} className={styles.section}>
              <h2>{attraction.name}</h2>
              <div
                className={`${styles.attractionCard} ${styles.clickable}`}
                onClick={() => handleCardClick("attraction", index)}
                role="button"
                tabIndex={0}
              >
                {attraction.image && (
                  <img
                    src={attraction.image}
                    alt={attraction.name}
                    className={styles.attractionImage}
                  />
                )}
                <p>{attraction.description}</p>
              </div>
            </section>
          ))}

          <section className={styles.section}>
            <h2>Cultural Information</h2>
            <div className={styles.grid}>
              {touristInfo?.culturalNotes.map((note, index) => (
                <div
                  key={index}
                  className={`${styles.card} ${styles.clickable}`}
                  onClick={() => handleCardClick("culture", index)}
                  role="button"
                  tabIndex={0}
                >
                  <h3>{note.title}</h3>
                  <p>{note.description}</p>
                </div>
              ))}
            </div>
          </section>

          <section className={styles.section}>
            <h2>Practical Information</h2>
            <div className={styles.grid}>
              {touristInfo?.practicalInfo.map((info, index) => (
                <div
                  key={index}
                  className={`${styles.card} ${styles.clickable}`}
                  onClick={() => handleCardClick("practical", index)}
                  role="button"
                  tabIndex={0}
                >
                  <h3>{info.title}</h3>
                  <p>{info.details}</p>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};
