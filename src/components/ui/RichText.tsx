import React, { Fragment } from 'react'

type TextNode = {
  text: string
  bold?: boolean
  italic?: boolean
  underline?: boolean
  strikethrough?: boolean
  code?: boolean
}

type ElementNode = {
  type: string
  children?: Node[]
  tag?: string
  url?: string
  listType?: string
  value?: number
  format?: string
  indent?: number
  direction?: string
  fields?: {
    url?: string
    newTab?: boolean
    linkType?: string
  }
}

type Node = TextNode | ElementNode

function isTextNode(node: Node): node is TextNode {
  return 'text' in node
}

function RichTextNode({ node }: { node: Node }) {
  if (isTextNode(node)) {
    let text: React.ReactNode = node.text

    if (!text) return null

    if (node.bold) {
      text = <strong className="font-semibold text-gray-900">{text}</strong>
    }
    if (node.italic) {
      text = <em className="italic">{text}</em>
    }
    if (node.underline) {
      text = <span className="underline">{text}</span>
    }
    if (node.strikethrough) {
      text = <span className="line-through">{text}</span>
    }
    if (node.code) {
      text = (
        <code className="bg-gray-100 text-green-700 px-1.5 py-0.5 rounded text-sm font-mono">
          {text}
        </code>
      )
    }

    return <Fragment>{text}</Fragment>
  }

  const children = (node as ElementNode).children || []

  switch ((node as ElementNode).type) {
    case 'paragraph':
      return (
        <p className="mb-4 last:mb-0 leading-relaxed">
          {children.map((child, i) => (
            <RichTextNode key={i} node={child} />
          ))}
        </p>
      )

    case 'heading': {
      const tag = (node as ElementNode).tag || 'h2'
      const headingClasses: Record<string, string> = {
        h1: 'text-2xl font-display font-bold text-gray-900 mb-4 mt-6',
        h2: 'text-xl font-display font-bold text-gray-900 mb-3 mt-5',
        h3: 'text-lg font-display font-semibold text-gray-900 mb-2 mt-4',
        h4: 'text-base font-semibold text-gray-900 mb-2 mt-3',
      }
      return React.createElement(
        tag,
        { className: headingClasses[tag] || headingClasses.h2 },
        children.map((child, i) => <RichTextNode key={i} node={child} />),
      )
    }

    case 'list': {
      const listType = (node as ElementNode).listType
      const ListTag = listType === 'number' ? 'ol' : 'ul'
      const listClass =
        listType === 'number'
          ? 'list-decimal list-inside space-y-1.5 mb-4 ml-4'
          : 'list-disc list-inside space-y-1.5 mb-4 ml-4'
      return (
        <ListTag className={listClass}>
          {children.map((child, i) => (
            <RichTextNode key={i} node={child} />
          ))}
        </ListTag>
      )
    }

    case 'listitem':
      return (
        <li className="text-gray-600 leading-relaxed">
          {children.map((child, i) => (
            <RichTextNode key={i} node={child} />
          ))}
        </li>
      )

    case 'quote':
      return (
        <blockquote className="border-l-4 border-green-400 pl-4 py-1 my-4 bg-green-50 rounded-r-lg">
          <p className="text-gray-600 italic text-sm leading-relaxed">
            {children.map((child, i) => (
              <RichTextNode key={i} node={child} />
            ))}
          </p>
        </blockquote>
      )

    case 'link': {
      const url = (node as ElementNode).fields?.url || (node as ElementNode).url || '#'
      const newTab = (node as ElementNode).fields?.newTab
      return (
        <a
          href={url}
          target={newTab ? '_blank' : undefined}
          rel={newTab ? 'noopener noreferrer' : undefined}
          className="text-green-600 hover:text-green-700 underline underline-offset-2 transition-colors"
        >
          {children.map((child, i) => (
            <RichTextNode key={i} node={child} />
          ))}
        </a>
      )
    }

    case 'horizontalrule':
      return <hr className="border-gray-200 my-6" />

    case 'linebreak':
      return <br />

    default:
      if (children.length > 0) {
        return (
          <Fragment>
            {children.map((child, i) => (
              <RichTextNode key={i} node={child} />
            ))}
          </Fragment>
        )
      }
      return null
  }
}

interface RichTextProps {
  content: any
  className?: string
}

export default function RichText({ content, className = '' }: RichTextProps) {
  if (!content) return null

  // Lexical format
  const nodes = content?.root?.children || content?.children || []

  if (!nodes.length) return null

  return (
    <div className={`text-gray-600 text-sm md:text-base leading-relaxed ${className}`}>
      {nodes.map((node: Node, i: number) => (
        <RichTextNode key={i} node={node} />
      ))}
    </div>
  )
}
