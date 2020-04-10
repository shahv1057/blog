import React from 'react';
import Plot from 'react-plotly.js';

class App extends React.Component {
  render() {
    return (
      <Plot
        data={[
          
            z: [224, 2499, 1077, 2726, 19043, 5655, 8781, 1440, 1116, 15690, 10204, 409, 433, 1145, 1232, 15078, 5943, 1055, 1393, 17030, 16790, 5529, 537, 20220, 1154, 3327, 11, 2003, 332, 3423, 251, 538, 788, 47437, 865, 2318, 149401, 5148, 1524, 1239, 16414, 620, 1450, 2552, 393, 4246, 9900, 1875, 3645, 45, 605, 9097, 2756, 483, 230],
            locations: ["AK", "AL", "AR", "AZ", "CA", "CO", "CT", "DC", "DE", "FL", "GA", "GU", "HI", "IA", "ID", "IL", "IN", "KS", "KY", "LA", "MA", "MD", "ME", "MI", "MN", "MO", "MP", "MS", "MT", "NC", "ND", "NE", "NH", "NJ", "NM", "NV", "NY", "OH", "OK", "OR", "PA", "PR", "RI", "SC", "SD", "TN", "TX", "UT", "VA", "VI", "VT", "WA", "WI", "WV", "WY"],
            locationmode: ['USA-states'],
            autocolorscale: false,
            colorscale: [[0.0, "white"], [0.2, "red"], [1, "darkred"]],
            type: "choropleth",
            colorbar: {"ticks": "outside", "title": {"side": "top", "text": "Cases"}},
            mode: "lines+markers",
            marker: {"line": {"color": "Black", "width": 2}},
          ]}  
            
        layout = { {
          width:800, 
          height:600,
          geo:{scope:'usa'} } }
      />
    );
  }
}

