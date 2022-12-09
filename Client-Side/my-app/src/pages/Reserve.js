// import React from 'react'
// import {
//   faBed,
//   faCalendarDays,
//   faCar,
//   faPerson,
//   faPlane,
//   faTaxi,
// } from "@fortawesome/free-solid-svg-icons";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { DateRange } from "react-date-range";
// import { useContext, useState } from "react";
// import "react-date-range/dist/styles.css"; // main css file
// import "react-date-range/dist/theme/default.css"; // theme css file
// import { format } from "date-fns";

// export default function Reserve() {
//   const [openDate, setOpenDate] = useState(false);
//   const [dates, setDates] = useState([
//     {
//       startDate: new Date(),
//       endDate: new Date(),
//       key: "selection",
//     },
//   ]);
//   return (
//     <div className="headerSearchItem">
//     <FontAwesomeIcon icon={faCalendarDays} className="headerIcon" />
//     <span
//       onClick={() => setOpenDate(!openDate)}
//       className="headerSearchText"
//     >{`${format(dates[0].startDate, "MM/dd/yyyy")} to ${format(
//       dates[0].endDate,
//       "MM/dd/yyyy"
//     )}`}</span>
//     {openDate && (
//       <DateRange
//         editableDateInputs={true}
//         onChange={(item) => setDates([item.selection])}
//         moveRangeOnFirstSelection={false}
//         ranges={dates}
//         className="date"
//         minDate={new Date()}
//       />
//     )}
//   </div>
//   )
// }
