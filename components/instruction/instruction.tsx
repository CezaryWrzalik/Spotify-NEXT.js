import classes from './instruction.module.css'

const InstructionPage = () => {
	return(
		<div className={classes.instruction}>
			<p>Due to fact that this page is only demo</p>
			<p>To continue using this page u have to</p>
			<ol>
				<li>Open your Spotify in app or browser on any device </li>
				<li>Select any song there</li>
				<li>Then ure good to go</li>
			</ol>
		</div>
	)
}

export default InstructionPage