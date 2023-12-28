import Link from 'next/link'
import React from 'react'

/**
 * @typedef {Object} Tab
 * @property {boolean} active - Indicates whether the tab is active.
 * @property {string} link - The URL the tab should navigate to.
 * @property {string} title - The text to be displayed on the tab.
 */

/**
 * @typedef {Object} TabsProps
 * @property {Tab[]} props - An array of tab objects.
 */

/**
 * Tabs component.
 * @param {TabsProps} props - The props object for the Tabs component.
 */

export default function Tabs({ props, className }) {

    return (
        <div className={`mb p bg df gap scroll ${className}`}>
            {props.map((d, i) => {
                const { active, link, title } = d
                return (
                    <Link key={i} href={link}>
                        <button className={`filled-btn ${active ? 'success-bg' : 'ci'}`}>
                            <h2>{title}</h2>
                        </button>
                    </Link>
                )
            })}
        </div>
    )
}


