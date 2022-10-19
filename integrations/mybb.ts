import qs from 'qs'
import Axios from 'axios'
import FormData from 'form-data'

export const adminGroupIds = [4, 19]
export const forumApiKey = 'Athal0n2020!MybbL0ginK3y'
export const baseURL = 'https://board.athalon.de'

const axios = Axios.create({
	baseURL
})

export interface LoginCredentials {
	username: string
	password: string
	token?: string
}

interface UserRegistration {
	username: string
	password: string
	email: string
}

const getRegistrationSubmission = (user: UserRegistration) => ({
	regcheck1: null,
	regcheck2: true,
	username: 'TestAccountBitteLoeschen3',
	password: 'asdasdasd',
	password2: 'asdasdasd',
	email: 'martin@happy-css.com',
	email2: 'martin@happy-css.com',
	referrername: '',
	answer: 'fantastisches rollenspiel',
	question_id: 'Y7FgQomQ4d6IQczo7cLLy4hpzNceOKOi',
	allownotices: 1,
	receivepms: 1,
	pmnotice: 1,
	subscriptionmethod: 0,
	timezoneoffset: 1,
	dstcorrection: 2,
	language: '',
	regtime: Math.floor(new Date().getTime() / 1000),
	step: 'registration',
	action: 'do_register',
	regsubmit: 'Registrierung bestätigen',
})

export const login = async (credentials: LoginCredentials) => {
	const forumUser = await loginWithForumAccount(dependencies, credentials)
	return {
		token: dependencies.lib.jwt.sign(R.pick(['gid', 'uid'], forumUser), dependencies.config.jwtSecret),
		...forumUser,
	}
}

const data = { 'bar': 123 };

const register = async (user: UserRegistration) => {
	const submission = getRegistrationSubmission(user)
	return axios.post('member.php', {}, {
		headers: { 'content-type': 'application/x-www-form-urlencoded' },
		data: qs.stringify(submission),
	})
}

const getPostSubmission = () => ({
	my_post_key: '9cb6d40ca1e2ebd3723fa728c007e01a',
	subject: 'Testpost',
	icon: '31',
	message: 'Zum Testen vom',
	submit: 'Thema absenden',
	action: 'do_newthread',
	posthash: 'c50406694f5f91d85c5ecaf7e76d4d3d',
	tid: '0',
})

const createPost = () => {
	const form = new FormData()
	Object.entries(getPostSubmission()).forEach(([key, value]) => form.append(key, value))
	return axios.post('newthread.php', form, {
		params: {
			fid: 19,
			processed: 1,
		}
	})
}

export const loginWithForumAccount = async (credentials: LoginCredentials): Promise<ForumUser> => {
	const { data: result } = await dependencies.config.forumClient.post(addApiKey(dependencies, 'api.php'), credentials)
	return result
}

export const getUsers = async (dependencies: Dependencies) => {
	const { data } = await dependencies.config.forumClient.get(addApiKey(dependencies, 'users.php'))
	return data
}

export const getUser = async (id: number) => {
	const users = await getUsers(dependencies)
	return R.find(R.propEq('uid', id), users)
}

export const getGroups = async (dependencies: Dependencies) => {
	const { data } = await dependencies.config.forumClient.get(addApiKey(dependencies, 'groups.php'))
	return data
}

