import Link from 'next/link'
import React from 'react'

/**
 * @typedef {Object} Tab
 * @property {boolean} className - className for tab.
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
 * @param {string} className - The props object for the Tabs component.
 */

export default function Tabs({ props, className }) {

    return (
        <div className={`p df bg scroll ${className}`}>
            {props.map((d, i) => {
                const { className: cn, link, title } = d
                return (
                    <Link key={i} href={link}>
                        <button className={`tab nowrap ${!i ? 'tab-start' : i === props.length - 1 ? 'tob-end' : ''} ${cn}`}>
                            <h2>{title}</h2>
                        </button>
                    </Link>
                )
            })}
        </div>
    )
}


