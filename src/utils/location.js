export async function getAddressFromCoordinates(lat, lng) {
  try {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&zoom=18&addressdetails=1`,
      {
        headers: {
          'Accept-Language': 'uz-UZ,uz;q=0.9,ru;q=0.8,en;q=0.7'
        }
      }
    );
    const data = await response.json();
    
    if (data.address) {
      const road = data.address.road || data.address.pedestrian || data.address.suburb || "";
      const house = data.address.house_number ? `, ${data.address.house_number}-uy` : "";
      const city = data.address.city || data.address.town || data.address.county || "";
      
      // Construct a cleaner address string
      if (road) {
        return `${city ? city + ', ' : ''}${road}${house}`;
      }
      return data.display_name.split(',').slice(0, 3).join(',');
    }
    return "Noma'lum manzil";
  } catch (e) {
    console.error("Geocoding error:", e);
    return `${lat.toFixed(4)}, ${lng.toFixed(4)}`;
  }
}

export function calculateDistance(lat1, lon1, lat2, lon2) {
  if (!lat1 || !lon1 || !lat2 || !lon2) return 0;
  
  const R = 6371; // Radius of the earth in km
  const dLat = deg2rad(lat2 - lat1);
  const dLon = deg2rad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const d = R * c; // Distance in km
  return parseFloat(d.toFixed(1));
}

function deg2rad(deg) {
  return deg * (Math.PI / 180);
}
