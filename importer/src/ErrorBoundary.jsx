import React from 'react'

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props)
        this.state = { hasError: false }
    }

    static getDerivedStateFromError(error) {
        return { hasError: true }
    }

    render() {
        if (this.state.hasError) {
            return <h4>Lazy component isn't rendered</h4>
        }

        return this.props.children
    }
}

export default ErrorBoundary