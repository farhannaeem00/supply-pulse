import { MapContainer, TileLayer, CircleMarker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const riskColors = {
  secure:   '#22c55e',
  low:      '#3b82f6',
  medium:   '#eab308',
  high:     '#f97316',
  critical: '#ef4444',
};

export default function Map({ suppliers, onSupplierClick }) {
  return (
    <MapContainer
      center={[20, 0]}
      zoom={2}
      style={{ height: '100%', width: '100%' }}
      scrollWheelZoom={false}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; OpenStreetMap contributors'
      />

      {suppliers.map(supplier => (
        <CircleMarker
          key={supplier._id}
          center={[supplier.lat, supplier.lng]}
          radius={10}
          fillColor={riskColors[supplier.riskLevel] || '#eab308'}
          color={riskColors[supplier.riskLevel] || '#eab308'}
          weight={2}
          opacity={0.9}
          fillOpacity={0.7}
          eventHandlers={{
            click: () => onSupplierClick && onSupplierClick(supplier),
          }}
        >
          <Popup>
            <div style={{ minWidth: '150px' }}>
              <p style={{ fontWeight: 'bold', marginBottom: '4px' }}>
                {supplier.name}
              </p>
              <p style={{ fontSize: '12px', color: '#666' }}>
                {supplier.city && `${supplier.city}, `}
                {supplier.country}
              </p>
              <p style={{ fontSize: '12px', marginTop: '4px' }}>
                Risk Score: <strong>{supplier.riskScore}/100</strong>
              </p>
              <p style={{ fontSize: '12px', textTransform: 'capitalize' }}>
                Level: <strong>{supplier.riskLevel}</strong>
              </p>
            </div>
          </Popup>
        </CircleMarker>
      ))}

    </MapContainer>
  );
}