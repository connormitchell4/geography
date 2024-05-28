//source: me,  https://en.wikipedia.org/wiki/List_of_alternative_country_names

const alternateNamesList = [
    {
      primary: 'Myanmar',
      alternates: ['Burma', "Republic of the Union of Myanmar"]
    },
    {
      primary: "United States of America",
      alternates: ['United States', 'America', "United States of America", "the States", "US", "US of A", 'USA']
    },
    {
      primary: "dominican rep.",
      alternates: ['Dominican Republic', 'Dominican']
    },
    {
      primary: "czechia",
      alternates: ['Czech Republic']
    },
    {
      primary: 'Trinidad and Tobago',
      alternates: ['Tobago and Trinidad', "Trinbago"]
    },
    {
      primary: 'St. Vin. and Gren.',
      alternates: [
        'Saint Vincent and the Grenadines',
        'St. Vincent and the Grenadines',
        'St Vincent and the Grenadines',
        'The Grenadines and Saint Vincent',
        'The Grenadines and St. Vincent'
      ]
    },
    {
      primary: 'Saint Lucia',
      alternates: ['St. Lucia', 'St Lucia']
    },
    {
      primary: 'Gambia',
      alternates: ['The Gambia']
    },
    {
      primary: 'Antigua and Barb.',
      alternates: ['Antigua and Barbuda', 'Barbuda and Antigua', 'Wadadli', ]
    },
    {
      primary: 'St. Kitts and Nevis',
      alternates: ['Saint Kitts and Nevis', 'Nevis and St. Kitts', 'Nevis and Saint Kitts', 'Federation of Saint Christopher and Nevis', 'St Kitts and Nevis']
    },
    {
      primary: 'South Korea',
      alternates: ['Sth. Korea']
    },
    {
      primary: 'North Korea',
      alternates: ['Nth. Korea']
    },
    {
      primary: 'United Arab Emirates',
      alternates: ['UAE']
    },
    {
      primary: 'Timor-Leste',
      alternates: ['Timor Leste', 'East Timor']
    },
    {
      primary: 'S. Sudan',
      alternates: ['South Sudan', 'Sth. Sudan']
    },
    {
      primary: 'Congo',
      alternates: ['Republic of Congo', 'Republic of the Congo', 'Congo Republic', 'Congo-Brazzaville', 'Congo Brazzaville']
    },
    {
      primary: "Dem. Rep. Congo",
      alternates: ['Democratic Republic of Congo', 'Democratic Republic of the Congo', 'Democratic Congo Republic', 'Congo-Kinshasa', 'Congo Kinshasa', 'DRC', 'D.R.C.']
    },
    {
      primary: "South Africa",
      alternates: ['Sth. Africa']
    },
    {
      primary: "Central African Rep.",
      alternates: ['CAR', "C.A.R.", 'Ubangi-Shari', 'Central African Empire', 'Central African Republic']
    },
    {
      primary: "Côte d'Ivoire",
      alternates: ['Ivory Coast', "Cote d'Ivoire"]
    },
    {
      primary: "eSwatini",
      alternates: ['Swaziland']
    },
    {
      primary: "Guinea-Bissau",
      alternates: ['Guinea Bissau']
    },
    {
      primary: "Eq. Guinea",
      alternates: ['Equatorial Guinea']
    },
    {
      primary: "São Tomé and Principe",
      alternates: ['Sao Tome and Principe', 'Principe and Sao Tome']
    },
    {
      primary: "Cabo Verde",
      alternates: ['Cape Verde']
    },
    {
      primary: "North Macedonia",
      alternates: ['Macedonia']
    },
    {
      primary: "United Kingdom",
      alternates: ['England', 'UK', "U.K.", 'Great Britain', 'Britain']
    },
    {
        primary: "Bosnia and Herz.",
        alternates: ['Bosnia and Herzegovina']
    },
    {
        primary: "Vatican",
        alternates: ['Vatican City']
    },
    {
      primary: "Macao",
      alternates: ['Macau']
    },
    {
        primary: "Marshall Is.",
        alternates: ['Marshall Islands']
    },
    {
        primary: "Solomon Is.",
        alternates: ['Solomon Islands']
    },
    {
        primary: "st-martin",
        alternates: ['Saint Martin', 'St Martin', 'St. Martin']
    },
    {
        primary: "curaçao",
        alternates: ['curacao']
    },
    {
        primary: "turks and caicos is.",
        alternates: ['Turks and Caicos', 'Turks and Caicos Islands']
    },
    {
      primary: "Turkey",
      alternates: ['Türkiye', 'Turkiye']
  },
    {
        primary: "st. pierre and miquelon",
        alternates: ['Saint Pierre and Miquelon', 'St pierre and Miquelon']
    },
    {
        primary: "u.s. virgin is.",
        alternates: ['U.S. Virgin Islands', 'US Virgin Islands']
    },
    {
        primary: "st-barthélemy",
        alternates: ['St. Barthelemy', 'Saint Barthelemy', 'St Barthelemy', "St. barthélemy", "St barthélemy", "Saint barthélemy"]
    },
    {
        primary: "british virgin is.",
        alternates: ['British Virgin Islands']
    },
    {
        primary: "cayman is.",
        alternates: ['cayman islands']
    },
    {
        primary: "bajo nuevo bank",
        alternates: ['Petrel Islands', 'Bajo Nuevo', 'Islas Petrel']
    },
    {
        primary: "serranilla bank",
        alternates: ['Isla Serranilla', 'Banco Serranilla']
    },
    {
        primary: "n. cyprus",
        alternates: ['North Cyprus', 'Northern Cyprus', 'Nth. Cyprus']
    },
    {
        primary: "Br. Indian Ocean Ter.",
        alternates: ['British Indian Ocean Territory', 'BIOT']
    },
    {
        primary: "spratly is.",
        alternates: ['Spratly Islands']
    },
    {
        primary: "falkland is.",
        alternates: ['Falkland Islands']
    },
    {
        primary: "w. sahara",
        alternates: ['Western Sahara', 'West Sahara']
    },
    {
        primary: "åland",
        alternates: ['aland']
    },
    {
        primary: "faeroe is.",
        alternates: ['faroe islands', 'faeroe islands', 'faroe is.', 'faroes', 'faeroes']
    },
    {
        primary: "pitcairn is.",
        alternates: ['pitcairn islands']
    },
    {
        primary: "fr. polynesia",
        alternates: ['French Polynesia']
    },
    {
        primary: "cook is.",
        alternates: ['cook islands']
    },
    {
        primary: "wallis and futuna is.",
        alternates: ['wallis and futuna', 'wallis and futuna islands', 'futuna and wallis', 'futuna and wallis islands']
    },
    {
        primary: "n. mariana is.",
        alternates: ['Nth. Mariana Islands', 'Northern Mariana Islands', 'North Mariana Islands']
    }, 
    {
        primary: "coral sea is.",
        alternates: ['coral sea islands']
    },
    {
        primary: "ashmore and cartier is.",
        alternates: ['ashmore and cartier islands', 'ashmore and cartier']
    }, 
    {
        primary: "s. geo. and the is.",
        alternates: ['South Georgia and the South Sandwich Islands', 'South Georgia and the Sandwich Islands',
                    'South Georgia and Sandwich Islands', 'South Georgia', 'Sandwich Islands', 'South Sandwich Islands and South Georgia', 'South Sandwich Islands and Georgia',
                    'Sandwich Islands and South Georgia', 'Sandwich Islands and Georgia', 'The South Sandwich Islands and South Georgia', 'The South Sandwich Islands and Georgia',
                    'South Sandwich and Georgia Islands', 'The South Sandwich and Georgia Islands', 'Georgia and South Sandwich', 'Georgia and South Sandwich Islands', "Georgia and the South Sandwich Islands",
                    'South Sandwich and Georgia', 'South Georgia and South Sandwich Islands', 'South Georgia and South Sandwich', 'South Sandwich and South Georgia', 'SGSSI']
    },
    {
        primary: "clipperton i.",
        alternates: ['Clipperton Island', 'Clipperton']
    }, 
    {
      primary: "french scattered islands (glorioso, tromelin, juan de nova, bassas da india, europa)",
      alternates: ['French Scattered Islands', 'Scattered Islands', "Glorioso", 'Glorioso Islands', 'tromelin', 'juan de nova', 'bassas da india', 'europa',
      'tromelin island', 'juan de nova island', 'bassas da india island', 'europa island'
      ]
    },
    {
    primary: "st. paul and amsterdam islands",
    alternates: ['saint paul and amsterdam islands', 'st paul and amsterdam islands', 'st. paul island', 'st paul island', 'saint paul island', 'amsterdam island', 'saint paul and new amsterdam islands']
    }, 
    {
      primary: "kerguelen islands",
      alternates: ['Kerguelen', 'Desolation Islands']
      }, 
    {
        primary: "Rodrigues",
        alternates: ['Rodrigues Island']
    }, 
    {
      primary: "desventuradas islands",
      alternates: ['desventuradas', 'unfortunate islands', 'islands of the unfortunate ones']
    }, 
    {
      primary: "juan fernandez islands",
      alternates: ['juan fernandez']
    }, 
    {
      primary: "Rapa Nui",
      alternates: ['Easter Island']
    }, 
    {
      primary: "cocos (keeling) islands",
      alternates: ['Cocos Islands', "Keeling Islands"]
    }, 
    {
      primary: "midway atoll",
      alternates: ['midway']
    },
    {
      primary: "Canary Islands",
      alternates: ['Canaries', 'canarias']
    }, 
    {
      primary: "Reunion",
      alternates: ['La Reunion', 'Reunion Island']
    }, 
    {
      primary: "galapagos islands",
      alternates: ['Galapagos']
    }, 
    {
      primary: "Ascension",
      alternates: ['Ascension Island']
    }, 
    {
      primary: "Tristan Da Cunha",
      alternates: ['Tristan Da Cunha Island']
    }, 
    {
      primary: "Saint Helena",
      alternates: ['St. Helena', "St Helena", "Saint Helena Island", 'St. Helena Island', 'St Helena Island']
    }, 
  
    
    
    
  ];
  
  const alternateNamesMapping = alternateNamesList.reduce((acc, { primary, alternates }) => {
    alternates.forEach((alt) => {
      acc[alt.toLowerCase()] = primary;
    });
    return acc;
  }, {});
  
  export default alternateNamesMapping;

  //do something about us minor outlying islands, french southern antarctic lands, indian ocean territory = cocos and christmas island
  