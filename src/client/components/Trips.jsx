import React, { useState, useEffect } from 'react';

import "react-datetime/css/react-datetime.css";
import Image from 'react-bootstrap/Image'
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Pagination from 'react-bootstrap/Pagination';

const TripsStyle = {
  position: 'relative'
}

const rootStyle = {
  display: 'flex',
  flexDirection: 'column',
};


const backgroundImageStyle = {
  height: '100vh',
  position: 'absolute',
  width: '100vw',
};

const hotelImageStyle = {
  width: 250
};

const NUM_CARDS_PER_PAGE = 6;
const MAX_PAGINATION_COUNT = 5;
const TRIPS_TOTAL_COUNT = 36;

function Trips(props) {
  const pages = [];
  const [active, setActive] = useState(1);
  const [trips, setTrips] = useState([]);
  const totalEpis = [];

  let indOfLastEpi = active * NUM_CARDS_PER_PAGE;
  let indOfFirstEpi = indOfLastEpi - NUM_CARDS_PER_PAGE;

  for (let number = 1; number <= TRIPS_TOTAL_COUNT; number++) {
    totalEpis.push(number);
  }

  for (let number = 1; number <= trips.length; number++) {
    totalEpis.push(number);
  }

  const pagination = (number) => {
    indOfLastEpi = number * NUM_CARDS_PER_PAGE;
    indOfFirstEpi = indOfLastEpi - NUM_CARDS_PER_PAGE;
    setActive(number);
    fetch("https://rickandmortyapi.com/api/episode/" + totalEpis.slice(indOfFirstEpi, indOfLastEpi), {
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'GET',
    })
      .then((res) => {
        res.json().then((data) => {
          // setTrips(data);
          setTrips([
            {
              id: 1,
              name: 'The Ritz-Carlton Residences, Waikiki Beach',
              check_in_date: 'December 2, 2013',
              check_out_date: 'December 2, 2013',
              address: '383 Kalaimoku Street Waikiki Beach, Hawaii 96815',
            },
            {
              id: 2,
              name: 'The Ritz-Carlton Residences, Waikiki Beach',
              check_in_date: 'December 2, 2013',
              check_out_date: 'December 2, 2013',
              address: '383 Kalaimoku Street Waikiki Beach, Hawaii 96815',
            },
            {
              id: 3,
              name: 'The Ritz-Carlton Residences, Waikiki Beach',
              check_in_date: 'December 2, 2013',
              check_out_date: 'December 2, 2013',
              address: '383 Kalaimoku Street Waikiki Beach, Hawaii 96815',
            },
            {
              id: 4,
              name: 'The Ritz-Carlton Residences, Waikiki Beach',
              check_in_date: 'December 2, 2013',
              check_out_date: 'December 2, 2013',
              address: '383 Kalaimoku Street Waikiki Beach, Hawaii 96815',
            }
          ]);
        });
      })
      .catch((exception) => {
        console.log('Error occurred:');
        console.log(exception);
      });
  }

  useEffect(() => {
    if (active === 1) {
      fetch("https://rickandmortyapi.com/api/episode/" + totalEpis.slice(indOfFirstEpi, indOfLastEpi), {
        headers: {
          'Content-Type': 'application/json'
        },
        method: 'GET',
      })
        .then((res) => {
          res.json().then((data) => {
            // setTrips(data);
            setTrips([
              {
                id: 1,
                name: 'The Ritz-Carlton Residences, Waikiki Beach',
                check_in_date: 'December 2, 2013',
                check_out_date: 'December 2, 2013',
                address: '383 Kalaimoku Street Waikiki Beach, Hawaii 96815',
              },
              {
                id: 2,
                name: 'The Ritz-Carlton Residences, Waikiki Beach',
                check_in_date: 'December 2, 2013',
                check_out_date: 'December 2, 2013',
                address: '383 Kalaimoku Street Waikiki Beach, Hawaii 96815',
              },
              {
                id: 3,
                name: 'The Ritz-Carlton Residences, Waikiki Beach',
                check_in_date: 'December 2, 2013',
                check_out_date: 'December 2, 2013',
                address: '383 Kalaimoku Street Waikiki Beach, Hawaii 96815',
              },
              {
                id: 4,
                name: 'The Ritz-Carlton Residences, Waikiki Beach',
                check_in_date: 'December 2, 2013',
                check_out_date: 'December 2, 2013',
                address: '383 Kalaimoku Street Waikiki Beach, Hawaii 96815',
              },
            ]);
          });
        })
        .catch((exception) => {
          console.log('Error occurred:');
          console.log(exception);
        });
    }
  }, [active]);

  for (let number = 1; number <= MAX_PAGINATION_COUNT; number++) {
    pages.push(
      <Pagination.Item
        key={number}
        active={number === active}
        onClick={() => pagination(number)}
      >
        {number}
      </Pagination.Item>
    );
  }

  return (
    <div style={rootStyle}>
      <Image src="https://images.unsplash.com/photo-1543731068-7e0f5beff43a" style={backgroundImageStyle} />
      <div style={{ margin: 'auto' }}>
        {trips && trips.map(trip => (
          <Card
            key={trip.id}
            style={{ width: "75vw", margin: "2rem", textAlign: "center" }}
          >
            <Card.Header>
              <span style={{ fontWeight: "bold" }}> {trip.name}</span>
            </Card.Header>
            <Card.Body style={{ display: "flex", flexDirection: "row" }}>
              <Image src="https://images.unsplash.com/photo-1618773928121-c32242e63f39" style={hotelImageStyle} />
              <div style={{ display: "flex", flexDirection: "column", width: "100vw" }}>
                <div style={{ display: "flex", flexDirection: "row", padding: "0px 0px 0px 10px", justifyContent: "space-around" }}>
                  <Card.Text>
                    {trip.address}
                  </Card.Text>
                  <Card.Text>
                    {trip.check_in_date} - {trip.check_out_date}
                  </Card.Text>
                </div>
                <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-evenly" }}>
                  <Button variant="outline-primary" type="submit">
                    View/Modify
                  </Button>
                  <Button variant="outline-primary" type="submit">
                    Cancel
                  </Button>
                </div>
              </div>
            </Card.Body>
            <Card.Footer>
            </Card.Footer>
          </Card>
        ))}
      </div>
      <Pagination style={{ margin: 'auto' }}>
        <Pagination.First onClick={() => {
          pagination(1);
        }} />
        <Pagination.Prev onClick={() => {
          if (active > 1) {
            pagination(active - 1);
          }
        }} />
        {pages}
        <Pagination.Next
          onClick={() => {
            if (active < 5) {
              pagination(active + 1);
            }
          }} />
        <Pagination.Last onClick={() => {
          pagination(5);
        }} />
      </Pagination>
    </div >
  );
}

export default Trips;