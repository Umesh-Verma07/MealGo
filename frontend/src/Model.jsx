import ReactDom from 'react-dom'

const MODEL_STYLES = {
  position: 'fixed',
  inset: '50% auto auto 50%',
  backgroundColor: 'rgba(255, 255, 255, 0.98)',
  transform: 'translate(-50%, -50%)',
  zIndex: 1100,
  height: 'min(88vh, 920px)',
  width: 'min(94vw, 1100px)',
  borderRadius: '28px',
  overflow: 'hidden',
  boxShadow: '0 28px 70px rgba(15, 23, 42, 0.28)',
  display: 'flex',
  flexDirection: 'column'
}

const OVERLAY_STYLES = {
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'rgba(12, 18, 16, 0.68)',
  backdropFilter: 'blur(6px)',
  zIndex: 1050
}

export default function Model({ children, onClose }) {

  return ReactDom.createPortal(
    <>
      <div style={OVERLAY_STYLES} onClick={onClose} />
      <div style={MODEL_STYLES}>
        <div style={{ display: 'flex', justifyContent: 'flex-end', padding: '1rem 1rem 0 1rem' }}>
          <button className='btn btn-sm btn-outline-secondary rounded-circle' style={{ width: '2.5rem', height: '2.5rem' }} onClick={onClose} aria-label="Close cart">
            ×
          </button>
        </div>
        <div style={{ flex: 1, overflowY: 'auto', padding: '0 1rem 1rem' }}>
          {children}
        </div>
      </div>
    </>,
    document.getElementById('cart-root')
  )
}