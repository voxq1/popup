import { useEffect, useRef, useState } from "react";
import { createRoot } from "react-dom/client";
import "./styles.css";

const navItems = [
  ["Inicio", "⌂"],
  ["Cámaras", "◫"],
  ["Transportes", "▣"],
  ["Inventario", "▤"],
  ["Alertas", "⚠"],
  ["Reportes", "▥"],
  ["Configuración", "⚙"],
];

const cameras = [
  {
    name: "Cámara 01",
    temp: -18,
    status: "Normal",
    location: "Centro de distribución Monterrey",
    path: "M0 173 C80 169, 130 178, 205 170 S340 176, 420 162 S520 170, 600 154",
  },
  {
    name: "Cámara 02",
    temp: -19,
    status: "Normal",
    location: "Centro de distribución Monterrey",
    path: "M0 194 C75 188, 145 195, 220 188 S340 193, 415 181 S520 185, 600 174",
  },
  {
    name: "Cámara 03",
    temp: -12,
    status: "Alerta",
    location: "Centro de distribución Monterrey",
    path: "M0 187 C50 190, 90 184, 130 188 S210 192, 260 185 S330 190, 380 184 S440 187, 470 164 S510 118, 540 91 S570 65, 600 61",
  },
  {
    name: "Cámara 04",
    temp: -17,
    status: "Normal",
    location: "Centro de distribución Monterrey",
    path: "M0 160 C70 166, 145 157, 220 163 S350 155, 430 161 S530 150, 600 157",
  },
    {
      name: "Cámara 05",
      temp: -20,
      status: "Normal",
      location: "Centro de distribución Monterrey",
      path: "M0 210 C70 205, 150 212, 230 204 S380 211, 470 202 S550 207, 600 198",
    },
    {
      name: "Cámara 06",
      temp: -16,
      status: "Normal",
      location: "Centro de distribución Monterrey",
      path: "M0 145 C80 151, 140 142, 220 149 S350 143, 430 151 S520 140, 600 146",
    },
    {
      name: "Cámara 07",
      temp: -24,
      status: "Alerta",
      location: "Centro de distribución Monterrey",
      path: "M0 185 C70 180, 140 190, 220 182 S350 188, 430 180 S520 190, 600 204",
    },
    {
      name: "Cámara 08",
      temp: -18,
      status: "Normal",
      location: "Centro de distribución Monterrey",
      path: "M0 175 C70 180, 145 170, 220 176 S350 168, 430 174 S530 165, 600 170",
    },
];
const cameraAlertHistory = {
  "Cámara 01": [["Revisión automática completada", "Hoy, 10:38 h", "normal"]],
  "Cámara 02": [["Temperatura estable", "Hoy, 10:35 h", "normal"]],
  "Cámara 03": [
    ["Temperatura fuera del rango", "Hoy, 10:37 h", "critical"],
    ["Sensor reportó aumento gradual", "Hoy, 09:22 h", "warning"],
  ],
  "Cámara 04": [["Revisión automática completada", "Hoy, 10:40 h", "normal"]],
    "Cámara 05": [["Temperatura estable", "Hoy, 10:34 h", "normal"]],
    "Cámara 06": [["Revisión automática completada", "Hoy, 10:32 h", "normal"]],
    "Cámara 07": [["Temperatura demasiado baja", "Hoy, 10:31 h", "critical"]],
    "Cámara 08": [["Temperatura estable", "Hoy, 10:29 h", "normal"]],
};

const transports = [
  ["Unidad 204", "En ruta", "en-ruta"],
  ["Unidad 305", "Entregando", "entregando"],
  ["Unidad 421", "Retraso detectado", "retraso"],
  ["Unidad 522", "En ruta", "en-ruta"],
  ["Unidad 615", "En mantenimiento", "mantenimiento"],
];
const transportDetails = {
  "Unidad 204": [
    "Centro Monterrey",
    "CEDIS Guadalajara",
    "14 min",
    "18 km",
    "36.764, -103.214",
  ],
  "Unidad 305": [
    "CEDIS Monterrey",
    "Cliente San Nicolas",
    "Llegando en 8 min",
    "6 km",
    "25.686, -100.276",
  ],
  "Unidad 421": [
    "Centro Monterrey",
    "CEDIS Saltillo",
    "Retraso de 22 min",
    "42 km",
    "25.654, -100.945",
  ],
  "Unidad 522": [
    "CEDIS Monterrey",
    "Cliente Apodaca",
    "27 min",
    "31 km",
    "25.780, -100.185",
  ],
  "Unidad 615": [
    "Taller Norte",
    "Centro Monterrey",
    "En mantenimiento",
    "0 km",
    "25.731, -100.316",
  ],
};
const transportMapPositions = {
  "Unidad 204": {
    origin: [16, 68],
    current: [47, 44],
    destination: [78, 20],
    route: {
      left: "17%",
      top: "25%",
      width: "63%",
      height: "42%",
      transform: "rotate(4deg)",
    },
  },
  "Unidad 305": {
    origin: [22, 28],
    current: [60, 52],
    destination: [80, 72],
    route: {
      left: "21%",
      top: "28%",
      width: "61%",
      height: "45%",
      transform: "rotate(30deg)",
    },
  },
  "Unidad 421": {
    origin: [18, 62],
    current: [54, 37],
    destination: [77, 24],
    route: {
      left: "19%",
      top: "26%",
      width: "61%",
      height: "44%",
      transform: "rotate(14deg)",
    },
  },
  "Unidad 522": {
    origin: [12, 45],
    current: [40, 26],
    destination: [75, 60],
    route: {
      left: "11%",
      top: "20%",
      width: "68%",
      height: "55%",
      transform: "rotate(-20deg)",
    },
  },
  "Unidad 615": {
    origin: [70, 70],
    current: [55, 58],
    destination: [28, 22],
    route: {
      left: "27%",
      top: "27%",
      width: "49%",
      height: "52%",
      transform: "rotate(-42deg)",
    },
  },
};
const temperatureHistory = {
  "Cámara 01": [-18, -17.8, -17.5, -17.9, -18.2, -18.1, -17.9, -18.3, -18.0, -17.7, -18.2, -18.1],
  "Cámara 02": [-19, -18.8, -19.2, -18.9, -19.3, -19.1, -18.95, -19.2, -19.0, -18.8, -19.1, -19.0],
  "Cámara 03": [-12, -12.5, -13.2, -11.8, -12.8, -13.5, -12.9, -11.5, -12.3, -13.1, -12.7, -12.4],
  "Cámara 04": [-17, -16.9, -17.2, -16.8, -17.1, -17.0, -16.85, -17.2, -17.1, -16.9, -17.0, -16.95],
  "Cámara 05": [-20, -19.9, -20.2, -19.8, -20.1, -20.0, -19.85, -20.2, -20.1, -19.9, -20.0, -19.95],
  "Cámara 06": [-16, -15.9, -16.1, -15.95, -16.0, -15.9, -15.85, -16.1, -16.0, -15.9, -15.95, -15.9],
  "Cámara 07": [-24, -24.5, -25.1, -23.8, -24.8, -25.3, -24.9, -23.5, -24.2, -25.0, -24.6, -24.3],
  "Cámara 08": [-18, -17.9, -18.2, -17.8, -18.1, -18.0, -17.85, -18.2, -18.05, -17.95, -18.0, -17.95],
};

const cameraAlerts = {
  "Cámara 01": { minTemp: -22, maxTemp: -15, enabled: true },
  "Cámara 02": { minTemp: -22, maxTemp: -15, enabled: true },
  "Cámara 03": { minTemp: -22, maxTemp: -15, enabled: true },
  "Cámara 04": { minTemp: -22, maxTemp: -15, enabled: true },
  "Cámara 05": { minTemp: -22, maxTemp: -15, enabled: true },
  "Cámara 06": { minTemp: -22, maxTemp: -15, enabled: true },
  "Cámara 07": { minTemp: -22, maxTemp: -15, enabled: true },
  "Cámara 08": { minTemp: -22, maxTemp: -15, enabled: true },
};

const inventoryProducts = [
  "Pollo", "Res", "Carne", "Helado", "Queso", "Pavo", "Cerdo", "Pescado",
  "Camarón", "Salmon", "Nuggets", "Hamburguesas", "Salchicha", "Jamón",
  "Tocino", "Pizza congelada", "Verduras mixtas", "Maíz congelado", "Brócoli",
  "Fresas", "Mango", "Papas a la francesa", "Pan congelado", "Yogur", "Mantequilla",
];
const inventory = inventoryProducts.flatMap((product, productIndex) =>
  ["Lote A", "Lote B", "Lote C", "Lote D"].map((lot, lotIndex) => [
    `${product} / ${lot}`,
    `${(2450 - productIndex * 31 - lotIndex * 120).toLocaleString("es-MX")} ${productIndex % 3 === 0 ? "kg" : "cajas"}`,
  ]),
);
const alerts = [
  ["Temperatura fuera del rango", "Cámara 03", "Hace 5 min", "critical"],
  ["Retraso en entrega", "Unidad 421", "Hace 15 min", "warning"],
  ["Falla en sensor", "Cámara 07", "Hace 1 hora", "critical"],
];

function StatusPill({ children, tone = "green" }) {
  return (
    <span className={`status-pill ${tone}`}>
      <i />
      {children}
    </span>
  );
}
function SearchBox({ placeholder, value, onChange }) {
  return (
    <label className="search-box">
      <span>⌕</span>
      <input value={value} onChange={onChange} placeholder={placeholder} />
    </label>
  );
}

function CameraDetail({ camera, onBack, settings }) {
  const [temperature, setTemperature] = useState(camera.temp);
  const [optionsOpen, setOptionsOpen] = useState(false);
  const [editing, setEditing] = useState(false);
  const [restarting, setRestarting] = useState(false);
  const [historyOpen, setHistoryOpen] = useState(false);
  const [cameraSettings, setCameraSettings] = useState(cameraAlerts[camera.name] || { minTemp: -22, maxTemp: -15, enabled: true });
  const isAlert =
    temperature > cameraSettings.maxTemp || temperature < cameraSettings.minTemp;
  useEffect(() => {
    if (!settings.demoMode) return undefined;
    const interval = window.setInterval(() => {
      setTemperature((current) => Number((current + 0.1).toFixed(1)));
    }, settings.updateInterval * 1000);
    return () => window.clearInterval(interval);
  }, [settings.demoMode, settings.updateInterval]);
  const exportData = () => {
    const content = `Cámara,Estado,Temperatura,Rango permitido\n${camera.name},${isAlert ? "Alerta" : "Normal"},${temperature} °C,${settings.minTemp} °C a ${settings.maxTemp} °C\n`;
    const link = document.createElement("a");
    link.href = URL.createObjectURL(
      new Blob([content], { type: "text/csv;charset=utf-8" }),
    );
    link.download = `${camera.name.toLowerCase().replace(" ", "-")}-datos.csv`;
    link.click();
    URL.revokeObjectURL(link.href);
    setOptionsOpen(false);
  };
  const restartCamera = () => {
    setRestarting(true);
    setOptionsOpen(false);
    window.setTimeout(() => setRestarting(false), 1800);
  };
  return (
    <div className="detail-page">
      <button className="back-button" onClick={onBack}>
        ← Volver a cámaras
      </button>
      <div className="page-heading">
        <div>
          <p className="eyebrow">MONITOREO / {camera.name.toUpperCase()}</p>
          <h1>Detalle de cámara</h1>
        </div>
        <div className="options-wrap">
          <button
            className="outline-button"
            aria-expanded={optionsOpen}
            onClick={() => setOptionsOpen(!optionsOpen)}
          >
            ⋮ Más opciones
          </button>
          {optionsOpen && (
            <div className="options-menu">
              <button
                onClick={() => {
                  setEditing(!editing);
                  setOptionsOpen(false);
                }}
              >
                ✎ {editing ? "Cerrar edición" : "Editar configuración"}
              </button>
              <button onClick={restartCamera}>↻ Reiniciar cámara</button>
              <button onClick={exportData}>↓ Exportar datos</button>
            </div>
          )}
        </div>
      </div>
      {restarting && (
        <div className="action-banner">
          ↻ Reiniciando {camera.name}... conexión restablecida.
        </div>
      )}
      {editing && (
        <section className="panel edit-panel">
          <div>
            <p className="eyebrow">CONFIGURACIÓN POR CÁMARA</p>
            <h2>Rango de temperatura y alertas</h2>
          </div>
          <label>
            Rango mínimo
            <input 
              type="number" 
              value={cameraSettings.minTemp} 
              onChange={(e) => setCameraSettings({...cameraSettings, minTemp: Number(e.target.value)})}
            /> °C
          </label>
          <label>
            Rango máximo
            <input 
              type="number" 
              value={cameraSettings.maxTemp} 
              onChange={(e) => setCameraSettings({...cameraSettings, maxTemp: Number(e.target.value)})}
            /> °C
          </label>
          <label className="switch-row">
            <span>
              <strong>Alertas activas</strong>
              <small>Recibirás notificaciones si sale del rango.</small>
            </span>
            <input
              type="checkbox"
              checked={cameraSettings.enabled}
              onChange={(e) => setCameraSettings({...cameraSettings, enabled: e.target.checked})}
            />
            <i />
          </label>
          <button
            className="primary-button"
            onClick={() => {
              cameraAlerts[camera.name] = cameraSettings;
              setEditing(false);
              alert("Configuración guardada correctamente.");
            }}
          >
            Guardar cambios
          </button>
        </section>
      )}
      <section className="detail-grid">
        <div className="panel camera-summary">
          <div className="summary-top">
            <div className="camera-icon large">◫</div>
            <div>
              <h2>{camera.name}</h2>
              <StatusPill tone={isAlert ? "red" : "green"}>
                {isAlert ? "Alerta" : "Normal"}
              </StatusPill>
            </div>
          </div>
          <dl>
            <div>
              <dt>Ubicación</dt>
              <dd>{settings.centerName}</dd>
            </div>
            <div>
              <dt>Temperatura actual</dt>
              <dd
                className={
                  isAlert ? "temperature" : "temperature normal-temperature"
                }
              >
                {temperature.toFixed(1)} °C
              </dd>
            </div>
            <div>
              <dt>Rango permitido</dt>
              <dd>
                {cameraSettings.minTemp} °C a {cameraSettings.maxTemp} °C
              </dd>
            </div>
            <div>
              <dt>Alertas</dt>
              <dd>
                <StatusPill tone={cameraSettings.enabled ? "green" : "yellow"}>
                  {cameraSettings.enabled ? "Activas" : "Inactivas"}
                </StatusPill>
              </dd>
            </div>
            <div>
              <dt>Última actualización</dt>
              <dd>
                {settings.demoMode
                  ? "Simulada en tiempo real"
                  : "Simulación pausada"}
              </dd>
            </div>
          </dl>
          <button
            className="primary-button full"
            onClick={() => setHistoryOpen(!historyOpen)}
          >
            ▤ {historyOpen ? "Ocultar historial" : "Historial de alertas"}
          </button>
          {historyOpen && (
            <div className="alert-history">
              <div className="history-heading">
                <strong>Eventos recientes</strong>
                <span>En vivo</span>
              </div>
              {cameraAlertHistory[camera.name].map(([title, time, tone]) => (
                <div className="history-item" key={title}>
                  <span className={`alert-symbol ${tone}`} />{" "}
                  <div>
                    <strong>{title}</strong>
                    <p>{time}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="panel chart-panel">
          <div className="panel-title">
            <div>
              <p className="eyebrow">ÚLTIMAS 24 HORAS</p>
              <h2>Historial de temperatura</h2>
            </div>
            <span
              className={`chart-current ${isAlert ? "" : "normal-temperature"}`}
            >
              {temperature.toFixed(1)} °C <small>actual</small>
            </span>
          </div>
          <div className="chart">
            <div className="chart-grid">
              <span>-10 °C</span>
              <span>-14 °C</span>
              <span>-18 °C</span>
              <span>-22 °C</span>
            </div>
            <svg
              viewBox="0 0 600 250"
              preserveAspectRatio="none"
              aria-label={`Gráfica de temperatura de ${camera.name}`}
            >
              <path className="area" d={`${camera.path} L600 250 L0 250Z`} />
              <path className="line" d={camera.path} />
              <circle
                cx="600"
                cy={camera.temp === -12 ? "61" : "157"}
                r="6"
                className={`point ${isAlert ? "" : "normal-point"}`}
              />
            </svg>
            <div className="chart-times">
              <span>24 h</span>
              <span>18 h</span>
              <span>12 h</span>
              <span>6 h</span>
              <span>Ahora</span>
            </div>
          </div>
          <div className="chart-note">
            <span className={`dot ${isAlert ? "red-dot" : "green-dot"}`} />
            {isAlert
              ? `Temperatura fuera del rango (${cameraSettings.minTemp}°C a ${cameraSettings.maxTemp}°C).`
              : `Temperatura dentro del rango permitido (${cameraSettings.minTemp}°C a ${cameraSettings.maxTemp}°C).`}
          </div>
          <div style={{ marginTop: '15px', padding: '12px', background: '#f6f9fb', borderRadius: '4px', fontSize: '11px' }}>
            <strong>Estadísticas del historial:</strong>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginTop: '10px' }}>
              <div>
                <p style={{ margin: '0 0 4px', color: '#718695' }}>Mín:</p>
                <p style={{ margin: '0', fontWeight: '600', color: '#1b3046' }}>
                  {Math.min(...temperatureHistory[camera.name]).toFixed(1)} °C
                </p>
              </div>
              <div>
                <p style={{ margin: '0 0 4px', color: '#718695' }}>Máx:</p>
                <p style={{ margin: '0', fontWeight: '600', color: '#1b3046' }}>
                  {Math.max(...temperatureHistory[camera.name]).toFixed(1)} °C
                </p>
              </div>
              <div>
                <p style={{ margin: '0 0 4px', color: '#718695' }}>Promedio:</p>
                <p style={{ margin: '0', fontWeight: '600', color: '#1b3046' }}>
                  {(temperatureHistory[camera.name].reduce((a, b) => a + b) / temperatureHistory[camera.name].length).toFixed(1)} °C
                </p>
              </div>
              <div>
                <p style={{ margin: '0 0 4px', color: '#718695' }}>Variación:</p>
                <p style={{ margin: '0', fontWeight: '600', color: '#1b3046' }}>
                  {(Math.max(...temperatureHistory[camera.name]) - Math.min(...temperatureHistory[camera.name])).toFixed(1)} °C
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function TransportDetail({ transport, onBack }) {
  const [name, status, tone] = transport;
  const [origin, destination, eta, distance, coordinates] =
    transportDetails[name];
  const positions = transportMapPositions[name];
  const markerStyle = ([left, top]) => ({ left: `${left}%`, top: `${top}%` });
  return (
    <div className="detail-page transport-detail">
      <button className="back-button" onClick={onBack}>
        ← Volver a transportes
      </button>
      <div className="page-heading">
        <div>
          <p className="eyebrow">OPERACIÓN / SEGUIMIENTO EN TIEMPO REAL</p>
          <h1>{name}</h1>
        </div>
        <StatusPill
          tone={
            tone === "retraso"
              ? "red"
              : tone === "mantenimiento"
                ? "yellow"
                : "blue"
          }
        >
          {status}
        </StatusPill>
      </div>
      <section className="transport-detail-grid">
        <div className="panel transport-info">
          <div className="summary-top">
            <div className="camera-icon large transport-icon">▣</div>
            <div>
              <h2>Ubicación actual</h2>
              <StatusPill tone="green">GPS conectado</StatusPill>
            </div>
          </div>
          <dl>
            <div>
              <dt>Ruta</dt>
              <dd>
                {origin} → {destination}
              </dd>
            </div>
            <div>
              <dt>Tiempo estimado</dt>
              <dd className={tone === "retraso" ? "temperature" : ""}>{eta}</dd>
            </div>
            <div>
              <dt>Distancia restante</dt>
              <dd>{distance}</dd>
            </div>
            <div>
              <dt>Coordenadas</dt>
              <dd>{coordinates}</dd>
            </div>
          </dl>
          <button
            className="primary-button full"
            onClick={() =>
              alert(`Actualización solicitada para ${name}. GPS sincronizado.`)
            }
          >
            ↻ Actualizar ubicación
          </button>
        </div>
        <div className="panel map-panel">
          <div className="panel-title">
            <div>
              <p className="eyebrow">GPS EN VIVO</p>
              <h2>Mapa de recorrido</h2>
            </div>
            <span className="map-updated">
              <span className="live-dot" />
              Actualizado ahora
            </span>
          </div>
          <div
            className="simulated-map"
            aria-label={`Mapa simulado de la ubicación de ${name}`}
          >
            <div className="map-road road-one" />
            <div className="map-road road-two" />
            <div className="map-road road-three" />
            <div className="map-route" style={positions.route} />
            <div
              className="map-pin origin-pin"
              style={markerStyle(positions.origin)}
            >
              <span>Origen</span>
            </div>
            <div
              className="map-pin current-pin"
              style={markerStyle(positions.current)}
            >
              <i />
              <span>{name}</span>
            </div>
            <div
              className="map-pin destination-pin"
              style={markerStyle(positions.destination)}
            >
              <span>Destino</span>
            </div>
            <div className="map-label label-one">Av. Miguel Alemán</div>
            <div className="map-label label-two">Carretera Nacional</div>
          </div>
          <div className="map-legend">
            <span>
              <i className="legend-dot current" />
              Ubicación actual
            </span>
            <span>
              <i className="legend-dot route" />
              Ruta planeada
            </span>
            <span>
              <i className="legend-dot destination" />
              Destino
            </span>
          </div>
        </div>
      </section>
    </div>
  );
}

function InventoryDetail({ item, onBack }) {
  const [product, lot] = item[0].split(" / ");
  const unit = item[1].includes("kg") ? "Kilogramos" : "Cajas";
  return <div className="detail-page inventory-detail"><button className="back-button" onClick={onBack}>← Volver a inventario</button><div className="page-heading"><div><p className="eyebrow">INVENTARIO / EXISTENCIAS</p><h1>{product}</h1></div><span className="overview-chip">{lot}</span></div><section className="inventory-detail-grid"><div className="panel inventory-summary"><div className="summary-top"><div className="camera-icon large inventory-icon">▤</div><div><h2>{product}</h2><StatusPill tone="green">Disponible</StatusPill></div></div><dl><div><dt>Existencia actual</dt><dd className="inventory-amount">{item[1]}</dd></div><div><dt>Identificador de lote</dt><dd>{lot}</dd></div><div><dt>Unidad de medida</dt><dd>{unit}</dd></div><div><dt>Almacenamiento</dt><dd>Cámara seca / Zona B</dd></div><div><dt>Última actualización</dt><dd>Simulada en tiempo real</dd></div></dl><button className="primary-button full" onClick={() => alert(`Inventario actualizado para ${product}, ${lot}.`)}>↻ Actualizar existencia</button></div><div className="panel inventory-info"><div className="panel-title"><div><p className="eyebrow">CONTROL DE EXISTENCIAS</p><h2>Información del producto</h2></div><span className="inventory-check">✓</span></div><div className="inventory-info-grid"><div><span>Estado del lote</span><strong>En almacenamiento</strong></div><div><span>Rotación estimada</span><strong>Alta</strong></div><div><span>Recepción</span><strong>Hoy, 08:30 h</strong></div><div><span>Próxima revisión</span><strong>En 2 horas</strong></div></div><div className="inventory-note"><span>i</span><p>Este registro se actualiza automáticamente cuando cambia la existencia del lote.</p></div></div></section></div>;
}

function Home({ onCamera, onViewAllAlerts, settings = { minTemp: -22, maxTemp: -15 } }) {
  return (
    <>
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-label">
            Estado general <span className="info">i</span>
          </div>
          <div className="stat-value green-text">
            <span className="live-dot" />
            Operación normal
          </div>
          <p>Todo funcionando correctamente</p>
        </div>
        <div className="stat-card">
          <div className="stat-label">Cámaras en rango</div>
          <div className="stat-value">
            7<span className="slash">/</span>8 <small>87%</small>
          </div>
          <div className="progress">
            <span />
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Transportes activos</div>
          <div className="stat-value">6</div>
          <p>Unidades en ruta</p>
        </div>
      </div>
      <div className="content-grid">
        <section className="panel">
          <div className="panel-title">
            <div>
              <p className="eyebrow">MONITOREO EN TIEMPO REAL</p>
              <h2>Cámaras frigoríficas</h2>
            </div>
            <button
              className="text-button"
              onClick={() => onCamera(cameras[0])}
            >
              Ver todas <span>→</span>
            </button>
          </div>
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Cámara</th>
                  <th>Temperatura</th>
                  <th>Estado</th>
                </tr>
              </thead>
              <tbody>
                {cameras.map((c) => {
                  const isAlert = c.temp > settings.maxTemp || c.temp < settings.minTemp;
                  return (
                  <tr
                    key={c.name}
                    onClick={() => onCamera(c)}
                    className="clickable"
                  >
                    <td>
                      <span className="camera-icon">◫</span>
                      {c.name}
                    </td>
                    <td className={isAlert ? "red-text" : ""}>
                      {c.temp} °C
                    </td>
                    <td>
                      <StatusPill
                        tone={isAlert ? "red" : "green"}
                      >
                        {isAlert ? "Alerta" : "Normal"}
                      </StatusPill>
                    </td>
                  </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </section>
        <AlertsPreview onViewAll={onViewAllAlerts} />
      </div>
    </>
  );
}

function CamerasOverview({ onCamera, settings }) {
  const [filter, setFilter] = useState("Todas");
  const alertCount = cameras.filter((camera) => camera.temp > settings.maxTemp || camera.temp < settings.minTemp).length;
  const visibleCameras = cameras.filter((camera) => {
    const isAlert = camera.temp > settings.maxTemp || camera.temp < settings.minTemp;
    return filter === "Todas" || (filter === "Alertas" ? isAlert : !isAlert);
  });
  return (
    <div className="camera-overview">
      <div className="camera-overview-head">
        <div>
          <p className="eyebrow">LECTURAS ACTUALES</p>
          <h2>Estado de las cámaras</h2>
          <p className="overview-description">
            Monitoreo térmico de todas las cámaras frigoríficas.
          </p>
        </div>
        <div className="overview-metrics">
          <strong>{cameras.length - alertCount}</strong>
          <span>normales</span>
          <strong className="red-text">{alertCount}</strong>
          <span>en alerta</span>
        </div>
      </div>
      <div className="camera-filters">{["Todas", "Normales", "Alertas"].map((option) => <button className={filter === option ? "active" : ""} key={option} onClick={() => setFilter(option)}>{option}<span>{option === "Todas" ? cameras.length : option === "Alertas" ? alertCount : cameras.length - alertCount}</span></button>)}</div>
      <section className="camera-cards">
        {visibleCameras.map((camera) => {
          const isAlert = camera.temp > settings.maxTemp || camera.temp < settings.minTemp;
          return (
            <button
              className="camera-card"
              key={camera.name}
              onClick={() => onCamera(camera)}
            >
              <div className="camera-card-top">
                <span className="camera-icon">◫</span>
                <StatusPill tone={isAlert ? "red" : "green"}>
                  {isAlert ? "Alerta" : "Normal"}
                </StatusPill>
              </div>
              <h3>{camera.name}</h3>
              <div className={`camera-card-temp ${isAlert ? "red-text" : ""}`}>
                {camera.temp} °C
              </div>
              <p>Rango: {settings.minTemp} °C a {settings.maxTemp} °C</p>
              <span className="camera-card-link">
                Ver temperatura <b>→</b>
              </span>
            </button>
          );
        })}
      </section>
    </div>
  );
}
function AlertsPreview({ onViewAll }) {
  return (
    <section className="panel alerts-preview">
      <div className="panel-title">
        <div>
          <p className="eyebrow">ACTIVIDAD RECIENTE</p>
          <h2>Alertas recientes</h2>
        </div>
        <span className="alert-count">2</span>
      </div>
      {alerts.slice(0, 2).map((a) => (
        <div className="alert-row" key={a[0]}>
          <span className={`alert-symbol ${a[3]}`}>
            {a[3] === "critical" ? "!" : "↗"}
          </span>
          <div>
            <strong>{a[0]}</strong>
            <p>
              {a[1]} <span>•</span> {a[2]}
            </p>
          </div>
          <span className="row-arrow">→</span>
        </div>
      ))}
      <button className="text-button all-alerts" onClick={onViewAll}>
        Ver todas las alertas <span>→</span>
      </button>
    </section>
  );
}

function ListPage({ section, onTransport, onInventory }) {
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const isTransport = section === "Transportes";
  const items = isTransport ? transports : inventory;
  const filtered = items.filter((item) =>
    item.join(" ").toLowerCase().includes(query.toLowerCase()),
  );
  const pageSize = isTransport ? 10 : 12;
  const pageCount = Math.max(1, Math.ceil(filtered.length / pageSize));
  const visibleItems = filtered.slice((page - 1) * pageSize, page * pageSize);
  useEffect(() => setPage(1), [query, section]);
  return (
    <div className="list-page">
      <div className="page-heading">
        <div>
          <p className="eyebrow">GESTIÓN OPERATIVA</p>
          <h1>{section}</h1>
        </div>
        <SearchBox
          placeholder={isTransport ? "Buscar unidad" : "Buscar producto"}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>
      <section className="panel list-panel">
        <div className="list-head">
          <span>
            {isTransport ? "Unidades registradas" : "Existencias actuales"}
          </span>
          <span>{filtered.length} resultados</span>
        </div>
        {visibleItems.map((item) => (
          <div className="list-row" key={item[0]}>
            <div className="list-leading">{isTransport ? "▣" : "▤"}</div>
            <strong>{item[0]}</strong>
            {isTransport ? (
              <StatusPill
                tone={
                  item[2] === "retraso"
                    ? "red"
                    : item[2] === "mantenimiento"
                      ? "yellow"
                      : "blue"
                }
              >
                {item[1]}
              </StatusPill>
            ) : (
              <b>{item[1]}</b>
            )}
            {isTransport ? (
              <button
                className="row-arrow transport-arrow"
                aria-label={`Ver ${item[0]}`}
                onClick={() => onTransport(item)}
              >
                →
              </button>
            ) : (
              <button className="row-arrow inventory-arrow" aria-label={`Ver ${item[0]}`} onClick={() => onInventory(item)}>→</button>
            )}
          </div>
        ))}
        {!filtered.length && (
          <div className="empty">No se encontraron resultados.</div>
        )}
        {filtered.length > 0 && pageCount > 1 && (
          <div className="list-pagination">
            <button disabled={page === 1} onClick={() => setPage(page - 1)}>← Anterior</button>
            <span>Página {page} de {pageCount}</span>
            <button disabled={page === pageCount} onClick={() => setPage(page + 1)}>Siguiente →</button>
          </div>
        )}
      </section>
    </div>
  );
}
function AlertsPage() {
  const [tab, setTab] = useState("Todas");
  const [alertItems, setAlertItems] = useState(
    alerts.map((alertItem) => ({ data: alertItem, state: "unread", priority: "normal" })),
  );
  const [openMenu, setOpenMenu] = useState(null);
  const [feedback, setFeedback] = useState("");
  const activeItems = alertItems.filter((item) => item.state !== "ignored");
  const visibleAlerts = activeItems.filter((item) =>
    tab === "Resueltas"
      ? item.state === "resolved"
      : tab === "No leídas"
        ? item.state === "unread"
        : item.state !== "resolved",
  );
  const updateAlert = (title, nextState) => {
    setAlertItems((current) =>
      current.map((item) =>
        item.data[0] === title ? { ...item, state: nextState } : item,
      ),
    );
    setOpenMenu(null);
    setFeedback(nextState === "resolved" ? "Alerta marcada como resuelta." : "Alerta ignorada.");
  };
  const togglePriority = (title) => {
    setAlertItems((current) =>
      current.map((item) =>
        item.data[0] === title
          ? { ...item, priority: item.priority === "high" ? "normal" : "high" }
          : item,
      ),
    );
    setOpenMenu(null);
    setFeedback("Prioridad de alerta actualizada.");
  };
  return (
    <div className="alerts-page">
      <div className="page-heading">
        <div>
          <p className="eyebrow">CENTRO DE NOTIFICACIONES</p>
          <h1>Alertas</h1>
        </div>
        <button
          className="outline-button"
          onClick={() => alert("✓ 3 alertas marcadas como leídas")}
        >
          ✓ Marcar todas como leídas
        </button>
      </div>
      <div className="tabs">
        {["Todas", "No leídas", "Resueltas"].map((t) => (
          <button
            className={tab === t ? "active" : ""}
            onClick={() => setTab(t)}
            key={t}
          >
            {t}
            <span>{t === "Todas" ? activeItems.filter((item) => item.state !== "resolved").length : t === "No leídas" ? activeItems.filter((item) => item.state === "unread").length : activeItems.filter((item) => item.state === "resolved").length}</span>
          </button>
        ))}
      </div>
      {feedback && <div className="action-banner alert-feedback">✓ {feedback}</div>}
      <section className="panel alerts-list">
        {visibleAlerts.map(({ data: a, priority }) => (
          <div className="alert-row large" key={a[0]}>
            <span className={`alert-symbol ${a[3]}`}>
              {a[3] === "critical" ? "!" : "↗"}
            </span>
            <div>
              <strong>{a[0]}{priority === "high" && <em className="priority-label">Alta</em>}</strong>
              <p>
                {a[1]} <span>•</span> {a[2]}
              </p>
            </div>
            <button
              className="more-button"
              aria-label={`Acciones para ${a[0]}`}
              aria-expanded={openMenu === a[0]}
              onClick={() => setOpenMenu(openMenu === a[0] ? null : a[0])}
            >
              ⋮
            </button>
            {openMenu === a[0] && <div className="alert-actions"><button onClick={() => updateAlert(a[0], "resolved")}>✓ Resolver</button><button onClick={() => updateAlert(a[0], "ignored")}>× Ignorar</button><button onClick={() => togglePriority(a[0])}>! {priority === "high" ? "Quitar prioridad" : "Cambiar prioridad"}</button></div>}
          </div>
        ))}
        {!visibleAlerts.length && (
          <div className="empty">{tab === "Resueltas" ? "No hay alertas resueltas." : "No hay alertas pendientes."}</div>
        )}
      </section>
    </div>
  );
}

function ConfigPage({ settings, onSave }) {
  const [draft, setDraft] = useState(settings);
  const [saved, setSaved] = useState(false);
  const [resetOpen, setResetOpen] = useState(false);
  useEffect(() => setDraft(settings), [settings]);
  const update = (key, value) => {
    const next = { ...draft, [key]: value };
    setDraft(next);
    onSave({
      ...next,
      minTemp: Number(next.minTemp),
      maxTemp: Number(next.maxTemp),
      updateInterval: Number(next.updateInterval),
    });
    setSaved(true);
  };
  const save = (event) => {
    event.preventDefault();
    onSave({
      ...draft,
      minTemp: Number(draft.minTemp),
      maxTemp: Number(draft.maxTemp),
      updateInterval: Number(draft.updateInterval),
    });
    setSaved(true);
  };
  return (
    <div className="settings-page">
      <div className="page-heading">
        <div>
          <p className="eyebrow">ADMINISTRACIÓN DEL SISTEMA</p>
          <h1>Configuración</h1>
        </div>
        <span className="settings-status">
          {saved ? "Cambios guardados" : "Configuración activa"}
        </span>
      </div>
      <form className="settings-grid" onSubmit={save}>
        <section className="panel settings-panel">
          <div className="panel-title">
            <div>
              <p className="eyebrow">CENTRO OPERATIVO</p>
              <h2>Datos generales</h2>
            </div>
            <span className="settings-icon">⚙</span>
          </div>
          <label className="setting-field">
            <span>Nombre del centro</span>
            <input
              value={draft.centerName}
              onChange={(event) => update("centerName", event.target.value)}
            />
          </label>
          <p className="setting-help">
            Este nombre se mostrará en la ubicación de las cámaras.
          </p>
          <label className="setting-field">
            <span>Rango mínimo de temperatura</span>
            <input
              type="number"
              value={draft.minTemp}
              onChange={(event) => update("minTemp", event.target.value)}
            />
            <small>°C</small>
          </label>
          <label className="setting-field">
            <span>Rango máximo de temperatura</span>
            <input
              type="number"
              value={draft.maxTemp}
              onChange={(event) => update("maxTemp", event.target.value)}
            />
            <small>°C</small>
          </label>
        </section>
        <section className="panel settings-panel">
          <div className="panel-title">
            <div>
              <p className="eyebrow">MONITOREO</p>
              <h2>Actualizaciones y avisos</h2>
            </div>
            <span className="settings-icon">◷</span>
          </div>
          <label className="setting-field">
            <span>Intervalo de actualización térmica</span>
            <select
              value={draft.updateInterval}
              onChange={(event) => update("updateInterval", event.target.value)}
            >
              <option value="3">Cada 3 segundos</option>
              <option value="5">Cada 5 segundos</option>
              <option value="10">Cada 10 segundos</option>
            </select>
          </label>
          <label className="setting-field">
            <span>Tema de interfaz</span>
            <select
              value={draft.theme}
              onChange={(event) => update("theme", event.target.value)}
            >
              <option value="light">Claro</option>
              <option value="dark">Oscuro</option>
            </select>
          </label>
          <label className="switch-row">
            <span>
              <strong>Modo demostración</strong>
              <small>Actualiza las temperaturas automáticamente.</small>
            </span>
            <input
              type="checkbox"
              checked={draft.demoMode}
              onChange={(event) => update("demoMode", event.target.checked)}
            />
            <i />
          </label>
          <label className="switch-row">
            <span>
              <strong>Notificaciones activas</strong>
              <small>Muestra avisos de alertas y sistema.</small>
            </span>
            <input
              type="checkbox"
              checked={draft.notifications}
              onChange={(event) =>
                update("notifications", event.target.checked)
              }
            />
            <i />
          </label>
          <button className="primary-button settings-save" type="submit">
            Guardar configuración
          </button>
          <button
            className="reset-button"
            type="button"
            onClick={() => setResetOpen(true)}
          >
            Restablecer configuración
          </button>
        </section>
      </form>
      {resetOpen && (
        <div className="confirm-overlay" role="dialog" aria-modal="true">
          <div className="confirm-dialog">
            <span className="confirm-icon">!</span>
            <h2>¿Restablecer configuración?</h2>
            <p>
              Se borrarán tus cambios y se recuperarán los valores iniciales.
              Esta acción no se puede deshacer.
            </p>
            <div className="confirm-actions">
              <button
                className="outline-button"
                type="button"
                onClick={() => setResetOpen(false)}
              >
                Cancelar
              </button>
              <button
                className="danger-button"
                type="button"
                onClick={() => {
                  onSave({
                    centerName: "Centro de distribución Monterrey",
                    minTemp: -22,
                    maxTemp: -15,
                    updateInterval: 5,
                    demoMode: true,
                    notifications: true,
                    theme: "light",
                  });
                  setResetOpen(false);
                  setSaved(true);
                }}
              >
                Sí, restablecer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function NotificationsPanel({ onViewAll, onClose }) {
  return (
    <div className="notification-panel">
      <div className="notification-panel-head">
        <div>
          <p className="eyebrow">CENTRO DE AVISOS</p>
          <h2>Notificaciones</h2>
        </div>
        <span className="alert-count">2 nuevas</span>
      </div>
      {alerts.slice(0, 2).map((item) => (
        <button
          className="notification-item"
          key={item[0]}
          onClick={() => {
            onClose();
            onViewAll();
          }}
        >
          <span className={`alert-symbol ${item[3]}`}>
            {item[3] === "critical" ? "!" : "↗"}
          </span>
          <span>
            <strong>{item[0]}</strong>
            <small>
              {item[1]} <i>•</i> {item[2]}
            </small>
          </span>
          <b>→</b>
        </button>
      ))}
      <div className="notification-panel-actions">
        <button onClick={() => alert("✓ Notificaciones marcadas como leídas")}>
          Marcar como leídas
        </button>
        <button onClick={() => { onClose(); onViewAll(); }}>
          Ver todas <span>→</span>
        </button>
      </div>
    </div>
  );
}

function Chatbot({ active }) {
  const [open, setOpen] = useState(false);
  const [closing, setClosing] = useState(false);
  const [thinking, setThinking] = useState(false);
  const [input, setInput] = useState("");
  const [searchMode, setSearchMode] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [clearConfirm, setClearConfirm] = useState(false);
  const [lastContext, setLastContext] = useState({ camera: null, transport: null, topic: "general" });
  const responseTimer = useRef(null);
  const messagesEndRef = useRef(null);
  
  // Cargar historial desde localStorage
  const [messages, setMessages] = useState(() => {
    try {
      const stored = window.localStorage.getItem("frialsa-chat-history");
      return stored ? JSON.parse(stored) : [
        { from: "bot", text: "Hola, soy Smart Cold. ¿Qué necesitas consultar?", timestamp: new Date().toLocaleTimeString("es-MX", { hour: "2-digit", minute: "2-digit" }) },
      ];
    } catch {
      return [
        { from: "bot", text: "Hola, soy Smart Cold. ¿Qué necesitas consultar?", timestamp: new Date().toLocaleTimeString("es-MX", { hour: "2-digit", minute: "2-digit" }) },
      ];
    }
  });

  // Guardar historial en localStorage
  useEffect(() => {
    window.localStorage.setItem("frialsa-chat-history", JSON.stringify(messages));
  }, [messages]);

  // Scroll automático
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, thinking]);

  const getContextualSuggestions = () => {
    const suggestions = {
      "Inicio": ["Resumen operativo", "Alertas recientes", "Cámaras en riesgo"],
      "Cámaras": ["Ver cámaras en alerta", "Historial de temperatura", "Configurar rangos"],
      "Transportes": ["Ver unidades activas", "Ubicación GPS", "Rutas con retraso"],
      "Inventario": ["Productos con stock bajo", "Buscar lote", "Resumen de inventario"],
      "Alertas": ["Resolver alerta", "Ver prioridades", "Historial de incidentes"],
      "Reportes": ["Exportar CSV", "Ver gráfico de temperatura", "Reporte del día"],
      "Configuración": ["Cambiar tema", "Ajustar alertas", "Notificaciones"],
    };
    return suggestions[active] || ["Resumen operativo", "Ver alertas", "Revisar cámaras"];
  };

  const findCameraByText = (value) => {
    const match = value.match(/c[aá]mara\s*(\d{1,2})/i);
    if (!match) return null;
    const cameraNumber = Number(match[1]);
    const normalizedName = `Cámara ${String(cameraNumber).padStart(2, "0")}`;
    return cameras.find((camera) => camera.name === normalizedName) || null;
  };

  const findTransportByText = (value) => {
    const match = value.match(/unidad\s*(\d{3})/i);
    if (!match) return null;
    const normalizedName = `Unidad ${match[1]}`;
    return transports.find(([name]) => name === normalizedName) || null;
  };

  const getReply = (question) => {
    const text = question.toLowerCase().trim();
    const normalized = text.replace(/[¿?¡!.,]/g, " ").replace(/\s+/g, " ").trim();
    const camerasAlerting = cameras.filter((camera) => camera.status === "Alerta").length;
    const transportActive = transports.filter(([, status]) => status !== "En mantenimiento").length;
    const transportDelayed = transports.filter(([, status]) => status === "Retraso detectado").length;
    const cameraMatch = findCameraByText(normalized) || (lastContext.camera && /(y la|la |las |esa|ese|cámara|camara|temperatura|sensor)/.test(normalized) ? cameras.find((camera) => camera.name === lastContext.camera) : null);
    const transportMatch = findTransportByText(normalized) || (lastContext.transport && /(unidad|ruta|retraso|transporte)/.test(normalized) ? transports.find(([name]) => name === lastContext.transport) : null);

    const detectTopic = () => {
      if (/(quien eres|eres|ayuda|puedes|qué haces|como puedes ayudar|funcionas)/.test(normalized)) return "identity";
      if (/(temperatura|frio|frío|calor|grados|cámara|camara|sensor|t[°º])/i.test(normalized)) return "temperature";
      if (/(alerta|alarma|riesgo|fallo|incidencia|problema|estado)/i.test(normalized)) return "alerts";
      if (/(transporte|unidad|ruta|gps|entrega|retraso|vehiculo|vehículo)/i.test(normalized)) return "transport";
      if (/(inventario|stock|producto|lote|almacen|almacén)/i.test(normalized)) return "inventory";
      if (/(reporte|exportar|csv|json|estadistica|gráfico|grafica|resumen)/i.test(normalized)) return "report";
      if (/(configuracion|configuración|tema|notificacion|notificaciones|ajuste|intervalo)/i.test(normalized)) return "config";
      if (/(estado|resumen|operacion|operación|cómo va|que pasa|qué pasa)/i.test(normalized)) return "summary";
      return "general";
    };

    const topic = detectTopic();

    if (cameraMatch) {
      setLastContext((current) => ({ ...current, camera: cameraMatch.name, topic: "temperature" }));
      const cameraConfig = cameraAlerts[cameraMatch.name] || { minTemp: -22, maxTemp: -15, enabled: true };
      const rangeText = `${cameraConfig.minTemp}°C a ${cameraConfig.maxTemp}°C`;
      const risk = cameraMatch.status === "Alerta" ? "alto" : "moderado";
      return `${cameraMatch.name} está a ${cameraMatch.temp}°C y su estado es ${cameraMatch.status.toLowerCase()}. Riesgo: ${risk}. Rango recomendado: ${rangeText}. Recomendación: revisar sensor y compresor en los próximos 15 minutos.`;
    }

    if (transportMatch) {
      setLastContext((current) => ({ ...current, transport: transportMatch[0], topic: "transport" }));
      const [, status] = transportMatch;
      const detail = transportDetails[transportMatch[0]] || [];
      return `${transportMatch[0]} está ${status.toLowerCase()}. Ruta: ${detail[0]} → ${detail[1]}. ETA: ${detail[2]}. Distancia restante: ${detail[3]}. Riesgo: ${status === "Retraso detectado" ? "alto" : "medio"}. Recomendación: monitorear ruta y contactar al chofer si persiste.`;
    }

    if (topic === "identity") {
      return 'Soy FrialsaBot, tu asistente de monitoreo para cámaras frigoríficas, transportes, inventario y alertas. Puedo ayudarte a revisar el estado operativo, priorizar riesgos y sugerir acciones.';
    }

    if (topic === "summary") {
      return `El centro está operando con ${cameras.length} cámaras monitoreadas, ${camerasAlerting} en alerta y ${transportActive} unidades activas. Riesgo general: medio. La prioridad actual es revisar la Cámara 03 y la Unidad 421.`;
    }

    if (topic === "temperature") {
      if (text.includes("alerta") || text.includes("fallo") || text.includes("problema")) {
        return `La situación térmica más crítica es la Cámara 03 a -12°C y la Cámara 07 a -24°C; ambas están fuera del rango recomendado. Riesgo: alto. Acción recomendada: revisar sensor y compresor para confirmar si hay un desajuste real.`;
      }
      return `El rango operativo recomendado es de -22°C a -15°C. Actualmente hay ${camerasAlerting} cámaras fuera de rango y el sistema está avisando de variaciones térmicas en la cadena de frío. Riesgo: medio-alto. Puedo ayudarte a identificar la cámara con atención inmediata.`;
    }

    if (topic === "alerts") {
      return `Hay ${alerts.length} alertas activas. Las más críticas son ${camerasAlerting} relacionadas con temperatura y ${transportDelayed} con retrasos operativos. Riesgo general: alto. Lo más prudente es priorizar cámaras fuera de rango y entregas con demora.`;
    }

    if (topic === "transport") {
      return `La operación logística sigue activa con ${transportActive} unidades en tránsito. La unidad con mayor riesgo es la Unidad 421 por retraso en ruta, mientras que el resto mantiene operación estable o programada. Riesgo: medio-alto. Recomendación: monitorear la entrega y activar seguimiento.`;
    }

    if (topic === "inventory") {
      return `El inventario del centro está monitoreado por producto y lote. El sistema tiene registros completos por SKU y puedes revisar stock, movimientos y lotes con riesgo sin salir de esta vista. Riesgo: bajo, pero requiere revisión puntual si hay movimiento irregular.`;
    }

    if (topic === "report") {
      return `Los reportes del sistema incluyen temperatura promedio, tendencia por hora, alertas y exportación en CSV o JSON. También puedes filtrar por cámara o periodo para analizar comportamiento operativo. Recomendación: revisar el último ciclo térmico antes de cerrar el día.`;
    }

    if (topic === "config") {
      return `Desde Configuración puedes ajustar el rango de temperatura, la frecuencia de actualización, las notificaciones y el tema visual. Recomendación: revisar límites térmicos si el proceso presenta variaciones frecuentes.`;
    }

    if (active === "Cámaras") {
      return `En Cámaras puedes consultar el estado general de las 8 cámaras frigoríficas. Actualmente ${camerasAlerting} están en alerta y el resto mantienen valores normales. Riesgo: medio. Puedo ayudarte a revisar cualquiera de ellas o a interpretar el historial térmico.`;
    }

    if (active === "Transportes") {
      return `En Transportes observas la operación logística y los retrasos actuales. Hay ${transportActive} unidades activas y ${transportDelayed} con retraso detectado. Riesgo: medio-alto. Si quieres, puedo resumirte qué ruta está más crítica.`;
    }

    if (active === "Inventario") {
      return `En Inventario tienes el estado de productos y lotes. El sistema ayuda a identificar movimiento, disponibilidad y posibles riesgos operativos sin perder trazabilidad.`;
    }

    if (active === "Alertas") {
      return `En Alertas está el centro de incidentes del sistema. La prioridad va a cámaras fuera de rango, retrasos logísticos y eventos que puedan afectar la operación en curso.`;
    }

    if (active === "Reportes") {
      return `En Reportes puedes ver métricas térmicas, gráficos en vivo y exportar datos relevantes para análisis. También se pueden comparar periodos y cámaras para detectar anomalías.`;
    }

    if (active === "Configuración") {
      return `En Configuración puedes personalizar notificaciones, tema, rangos térmicos y frecuencia de actualización para adaptar el sistema a tu operación.`;
    }

    if (text.includes("hola") || text.includes("buenas") || text.includes("buenos") || text.includes("saludos")) {
      return "Hola. Estoy revisando el estado operativo del centro y puedo ayudarte con cámaras, alertas, transportes, inventario y reportes.";
    }

    if (text.includes("gracias") || text.includes("thank you")) {
      return "De nada. Estoy listo para ayudarte a revisar el estado del centro, priorizar riesgos o explicar cualquier dato del sistema.";
    }

    const hasSystemContext = /(cámara|camara|temperatura|alerta|transporte|unidad|ruta|inventario|producto|lote|reporte|configuracion|configuración|centro|frio|frío|sensor|gps|stock|entrega)/i.test(normalized);

    if (!hasSystemContext) {
      return "No entiendo esa pregunta. Puedo ayudarte con cámaras, alertas, transportes, inventario, reportes o configuración del centro.";
    }

    return `Con base en el estado actual del centro, el foco principal está en ${camerasAlerting} cámaras con temperatura fuera de rango y ${transportDelayed} unidades con retraso. Si me dices una cámara, unidad o tipo de duda, te respondo con más detalle.`;
  };

  const scheduleBotReply = (userText) => {
    const text = userText.trim();
    if (!text || thinking) return;

    if (responseTimer.current) {
      window.clearTimeout(responseTimer.current);
    }

    setThinking(true);
    responseTimer.current = window.setTimeout(() => {
      setMessages((current) => [
        ...current,
        { from: "bot", text: getReply(text), timestamp: new Date().toLocaleTimeString("es-MX", { hour: "2-digit", minute: "2-digit" }) },
      ]);
      setThinking(false);
      responseTimer.current = null;
    }, 700);
  };

  const quickAction = (action) => {
    const text = action.trim();
    if (!text) return;
    setMessages((current) => [...current, { from: "user", text, timestamp: new Date().toLocaleTimeString("es-MX", { hour: "2-digit", minute: "2-digit" }) }]);
    scheduleBotReply(text);
  };

  const sendMessage = (event) => {
    event.preventDefault();
    const question = input.trim();
    if (!question || thinking) return;
    setMessages((current) => [...current, { from: "user", text: question, timestamp: new Date().toLocaleTimeString("es-MX", { hour: "2-digit", minute: "2-digit" }) }]);
    setInput("");
    scheduleBotReply(question);
  };

  const clearHistory = () => {
    if (clearConfirm) {
      setMessages([{ from: "bot", text: "Historial limpiado. Nuevo chat iniciado.", timestamp: new Date().toLocaleTimeString("es-MX", { hour: "2-digit", minute: "2-digit" }) }]);
      setClearConfirm(false);
      return;
    }

    setClearConfirm(true);
  };

  const filteredMessages = searchMode 
    ? messages.filter(m => m.text.toLowerCase().includes(searchQuery.toLowerCase()))
    : messages;

  const closeChat = () => {
    setClosing(true);
    window.setTimeout(() => {
      setOpen(false);
      setClosing(false);
    }, 180);
  };

  useEffect(() => () => window.clearTimeout(responseTimer.current), []);

  return (
    <div className={`chatbot ${open ? "chatbot-open" : ""}`}>
      <button className="chatbot-launcher" aria-label={open ? "Cerrar asistente" : "Abrir asistente"} onClick={() => open ? closeChat() : setOpen(true)}>✦</button>
      {open && (
        <section className={`chatbot-panel ${closing ? "chatbot-closing" : ""}`}>
          <div className="chatbot-head">
            <div>
              <span className="chatbot-status" /> 
              <strong>FrialsaBot</strong>
            </div>
            <button aria-label="Cerrar asistente" onClick={closeChat}>×</button>
          </div>

          {!searchMode && (
            <div className="chatbot-suggestions">
              <strong>Sugerencias:</strong>
              <div className="chatbot-suggestions-row">
                {getContextualSuggestions().map((sug, i) => (
                  <button key={i} onClick={() => quickAction(sug)}>
                    {sug}
                  </button>
                ))}
              </div>
            </div>
          )}

          {clearConfirm && (
            <div className="chatbot-clear-confirm">
              <div className="chatbot-clear-title">
                ¿Limpiar historial de chat?
              </div>
              <div className="chatbot-clear-actions">
                <button type="button" onClick={() => setClearConfirm(false)} className="chatbot-clear-cancel">
                  Cancelar
                </button>
                <button type="button" onClick={clearHistory} className="chatbot-clear-ok">
                  Aceptar
                </button>
              </div>
            </div>
          )}

          <div className="chatbot-messages" style={{ position: "relative" }}>
            {filteredMessages.map((message, index) => (
              <div className={`chat-message-line ${message.from}`} key={`${message.from}-${index}`}>
                {message.from === "bot" && <img className="chatbot-avatar" src="/logo.png" alt="FrialsaBot" />}
                <div style={{ flex: 1 }}>
                  <div className={`chat-message ${message.from}`}>{message.text}</div>
                  <small style={{ fontSize: "8px", color: "#8997a3", marginTop: "3px", display: "block" }}>{message.timestamp}</small>
                </div>
              </div>
            ))}
            {thinking && (
              <div className="chat-message-line bot">
                <img className="chatbot-avatar" src="/logo.png" alt="FrialsaBot" />
                <div className="chat-message bot thinking-message"><span>Pensando</span><i /><i /><i /></div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="chatbot-action-row">
            <button onClick={() => setSearchMode(!searchMode)}>
              {searchMode ? "Cerrar búsqueda" : "Buscar"}
            </button>
            <button onClick={clearHistory}>
              Limpiar
            </button>
          </div>

          {searchMode && (
            <div className="chatbot-search-panel">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Buscar en historial..."
              />
              <small>
                {filteredMessages.length} de {messages.length} mensajes
              </small>
            </div>
          )}

          <form className="chatbot-form" onSubmit={sendMessage}>
            <input
              value={input}
              onChange={(event) => setInput(event.target.value)}
              placeholder="Escribe una pregunta..."
              aria-label="Mensaje para el asistente"
            />
            <button type="submit" aria-label="Enviar mensaje" disabled={thinking}>→</button>
          </form>
        </section>
      )}
    </div>
  );
}

function ReportsPage({ settings }) {
  const [reportType, setReportType] = useState("Temperatura");
  const [period, setPeriod] = useState("Últimas 24 horas");
  const [live, setLive] = useState(settings.demoMode);
  const [readings, setReadings] = useState([18, 19, 17, 18, 16, 19, 18, 20, 18, 17, 19, 18]);
  const [selectedCamera, setSelectedCamera] = useState("Todas");
  useEffect(() => {
    if (!live) return undefined;
    const interval = window.setInterval(() => {
      setReadings((current) => [...current.slice(1), 16 + Math.floor(Math.random() * 5)]);
    }, settings.updateInterval * 1000);
    return () => window.clearInterval(interval);
  }, [live, settings.updateInterval]);
  const average = (readings.reduce((total, value) => total + value, 0) / readings.length).toFixed(1);
  const max = Math.max(...readings);
  const min = Math.min(...readings);
  const exportReport = (format = 'csv') => {
    let content = '';
    const timestamp = new Date().toLocaleString('es-MX');
    
    if (format === 'csv') {
      content = `Reporte Frialsa Smart Cold\nFecha de generación,${timestamp}\nTipo,${reportType}\nPeriodo,${period}\n\nEstadísticas\nPromedio (°C),${average}\nMáximo (°C),${max}\nMínimo (°C),${min}\nMuestras,${readings.length}\n\nLecturas horarias\n`;
      readings.forEach((temp, i) => {
        content += `${24 - Math.floor(readings.length / 2) + i}h,${temp}\n`;
      });
    } else if (format === 'json') {
      content = JSON.stringify({
        generatedAt: timestamp,
        report: {
          type: reportType,
          period: period,
          camera: selectedCamera,
          statistics: {
            average: parseFloat(average),
            max: max,
            min: min,
            samples: readings.length
          },
          readings: readings
        }
      }, null, 2);
    }
    
    const link = document.createElement("a");
    const fileName = `reporte-frialsa-${new Date().toISOString().split('T')[0]}.${format}`;
    const mimeType = format === 'csv' ? 'text/csv;charset=utf-8' : 'application/json;charset=utf-8';
    
    link.href = URL.createObjectURL(new Blob([content], { type: mimeType }));
    link.download = fileName;
    link.click();
    URL.revokeObjectURL(link.href);
    alert(`✓ Reporte exportado como ${fileName}`);
  };
  return <div className="reports-page"><div className="page-heading"><div><p className="eyebrow">ANÁLISIS OPERATIVO</p><h1>Reportes</h1></div><div className="report-live-status"><span className={`live-dot ${live ? "" : "paused-dot"}`} />{live ? "Actualización en vivo" : "Actualización pausada"}</div></div><div className="report-controls panel"><label>Tipo de reporte<select value={reportType} onChange={(event) => setReportType(event.target.value)}><option>Temperatura</option><option>Alertas</option><option>Rendimiento de cámaras</option></select></label><label>Cámara<select value={selectedCamera} onChange={(event) => setSelectedCamera(event.target.value)}><option>Todas</option>{cameras.map(c => <option key={c.name}>{c.name}</option>)}</select></label><label>Periodo<select value={period} onChange={(event) => setPeriod(event.target.value)}><option>Últimas 24 horas</option><option>Últimos 7 días</option><option>Este mes</option></select></label><button className="outline-button" onClick={() => setLive(!live)}>{live ? "Pausar actualización" : "Reanudar actualización"}</button><button className="primary-button" onClick={() => exportReport('csv')}>↓ CSV</button><button className="primary-button" onClick={() => exportReport('json')}>↓ JSON</button></div><div className="report-stats"><div className="stat-card"><span className="stat-label">Promedio térmico</span><strong>{average} °C</strong><small>Lectura en vivo</small></div><div className="stat-card"><span className="stat-label">Máxima registrada</span><strong className="red-text">{max} °C</strong><small>En el periodo elegido</small></div><div className="stat-card"><span className="stat-label">Mínima registrada</span><strong className="green-text">{min} °C</strong><small>En el periodo elegido</small></div></div><div className="report-grid"><section className="panel report-chart"><div className="panel-title"><div><p className="eyebrow">SERIE TEMPORAL</p><h2>{reportType}</h2></div><span className="report-updated">● En vivo</span></div><div className="report-graph"><div className="report-y-axis"><span>22 °C</span><span>18 °C</span><span>14 °C</span></div><div className="report-bars">{readings.map((value, index) => <div className="report-bar-column" key={`${value}-${index}`}><div className="report-bar" style={{ height: `${Math.max(18, value * 3.2)}%` }} title={`${value} °C`} /><span>{index + 1}h</span></div>)}</div></div></section><section className="panel report-table"><div className="panel-title"><div><p className="eyebrow">RESUMEN</p><h2>Últimas lecturas</h2></div><span className="report-count">{readings.length}</span></div>{readings.slice(-5).reverse().map((value, index) => <div className="report-row" key={`${value}-${index}`}><span className="report-row-dot" /><strong>Cámara 0{(index % 4) + 1}</strong><span>{value} °C</span><small>{index + 1} min</small></div>)}</section></div></div>;
}

function App() {
  const defaultSettings = {
    centerName: "Centro de distribución Monterrey",
    minTemp: -22,
    maxTemp: -15,
    updateInterval: 5,
    demoMode: true,
    notifications: true,
    theme: "light",
  };
  const [active, setActive] = useState("Inicio");
  const [detail, setDetail] = useState(false);
  const [selectedCamera, setSelectedCamera] = useState(null);
  const [selectedTransport, setSelectedTransport] = useState(null);
  const [selectedInventory, setSelectedInventory] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [settings, setSettings] = useState(() => {
    try {
      const stored = window.localStorage.getItem("frialsa-settings");
      return stored ? { ...defaultSettings, ...JSON.parse(stored) } : defaultSettings;
    } catch {
      return defaultSettings;
    }
  });
  const saveSettings = (nextSettings) => {
    setSettings(nextSettings);
    window.localStorage.setItem("frialsa-settings", JSON.stringify(nextSettings));
  };
  const navigate = (name) => {
    setDetail(false);
    setSelectedCamera(null);
    setSelectedTransport(null);
    setSelectedInventory(null);
    setActive(name);
    setMenuOpen(false);
    setNotificationsOpen(false);
  };
  const openCamera = (camera) => {
    setSelectedCamera(camera);
    setDetail(true);
    setActive("Cámaras");
  };
  const refresh = () => alert("✓ Sistema actualizado");
  return (
    <div className={`app-shell ${settings.theme === "dark" ? "theme-dark" : ""}`}>
      <aside className={`sidebar ${menuOpen ? "open" : ""}`}>
        <div className="brand">
          <img src="/logo.png" alt="Frialsa Logo" className="brand-mark" />
          <div>
            FRIALSA
            <br />
            <b>SMART COLD</b>
          </div>
        </div>
        <nav>
          {navItems.map(([name, icon]) => (
            <button
              key={name}
              className={active === name ? "selected" : ""}
              onClick={() => navigate(name)}
            >
              <span>{icon}</span>
              {name}
              {name === "Alertas" && <i className="nav-badge">2</i>}
            </button>
          ))}
        </nav>
        <div className="sidebar-footer">
          <div className="user-avatar">AM</div>
          <div>
            <strong>Admin. operaciones</strong>
            <small>{settings.centerName}</small>
          </div>
          <span>⌄</span>
        </div>
      </aside>
      <main className="main">
        <header className="topbar">
          <button
            className="mobile-menu"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            ☰
          </button>
          <div className="breadcrumb">
            Panel de control <span>/</span>{" "}
            {detail
              ? `Detalle de ${selectedCamera?.name || "cámara"}`
              : selectedTransport
                ? selectedTransport[0]
                : active}
          </div>
          <div className="top-actions">
            <button
              className="icon-button"
              onClick={() =>
                alert(
                  "🔍 Búsqueda global: usa el buscador de Transportes o Inventario",
                )
              }
            >
              ⌕
            </button>
            <button
              className="notification"
              aria-expanded={notificationsOpen}
              onClick={() => settings.notifications && setNotificationsOpen(!notificationsOpen)}
            >
              ♧{settings.notifications && <i />}
            </button>
            {settings.notifications && notificationsOpen && (
              <NotificationsPanel
                onClose={() => setNotificationsOpen(false)}
                onViewAll={() => navigate("Alertas")}
              />
            )}
            <span className="date">27 AGO 2026</span>
          </div>
        </header>
        <div
          className="page-content"
          key={`${active}-${detail}-${selectedCamera?.name || ""}-${selectedTransport?.[0] || ""}`}
        >
            {detail && selectedCamera ? (
            <CameraDetail
              camera={selectedCamera}
              settings={settings}
              onBack={() => setDetail(false)}
            />
            ) : selectedTransport ? (
            <TransportDetail
              transport={selectedTransport}
              onBack={() => setSelectedTransport(null)}
            />
            ) : selectedInventory ? (
              <InventoryDetail
                item={selectedInventory}
                onBack={() => setSelectedInventory(null)}
              />
          ) : active === "Inicio" ? (
            <>
              <div className="page-heading">
                <div>
                  <p className="eyebrow">JUEVES, 27 DE AGOSTO DE 2026</p>
                  <h1>Resumen general</h1>
                </div>
                <div className="welcome">
                  Última actualización <b>10:42 h</b>{" "}
                  <button className="refresh" onClick={refresh}>
                    ↻
                  </button>
                </div>
              </div>
              <Home
                onCamera={openCamera}
                onViewAllAlerts={() => navigate("Alertas")}
                settings={settings}
              />
            </>
          ) : active === "Cámaras" ? (
            <>
              <div className="page-heading">
                <div>
                  <p className="eyebrow">MONITOREO EN TIEMPO REAL</p>
                  <h1>Cámaras</h1>
                </div>
                <span className="overview-chip">
                  <span className="live-dot" />7 de 8 en rango
                </span>
              </div>
              <CamerasOverview onCamera={openCamera} settings={settings} />
            </>
          ) : active === "Transportes" || active === "Inventario" ? (
            <ListPage section={active} onTransport={setSelectedTransport} onInventory={setSelectedInventory} />
          ) : active === "Alertas" ? (
            <AlertsPage />
          ) : active === "Reportes" ? (
            <ReportsPage settings={settings} />
          ) : active === "Configuración" ? (
            <ConfigPage settings={settings} onSave={saveSettings} />
          ) : (
            <div className="placeholder">
              <span>▥</span>
              <h1>{active}</h1>
              <p>
                Esta sección está lista para integrar nuevos reportes
                operativos.
              </p>
            </div>
          )}
        </div>
      </main>
      <Chatbot active={active} />
    </div>
  );
}

export default App;

createRoot(document.getElementById("root")).render(<App />);
