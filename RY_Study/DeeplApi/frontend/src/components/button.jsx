import classNames from "classnames"

export default function Button(props) {
    const styles = [
        'flex',
        'items-center',
        'text-base',
        'px-3',
        'py-2',
        'mt-3',
        'border',
        'border-purple-400',
        'rounded-[10px]',
        'hover:bg-purple-600',
        'hover:border-purple-600',
        'transition-colors',
        'duration-75',
    ]

    return <button className={classNames(styles.join(' '), props.classAdd)} onClick={props.onClick} disabled={props.disabled} > { props.info } </button>
}