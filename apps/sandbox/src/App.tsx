export default function App() {
  return (
    <div style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
      <p>
        Testing live exports from <code>@my-org/package-1</code> and <code>@my-org/package-2</code>.
      </p>
      <hr />
      <div style={{ background: '#f4f4f4', padding: '1rem', borderRadius: '8px' }}>
        <strong>Status output:</strong> {status}
      </div>
    </div>
  );
}
