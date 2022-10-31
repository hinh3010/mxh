const passport = require("passport");
import { UserEntity } from '../../apis/user/user.entity';
import { UserService } from '../../apis/user/user.service';
import { Env } from '../../config/env';

const JwtStrategy = require("passport-jwt").Strategy;
const { ExtractJwt } = require("passport-jwt");

const LocalStrategy = require("passport-local").Strategy;


const userService = new UserService()

// Passport Jwt
passport.use(
    new JwtStrategy(
        {
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken("Authorization"),
            secretOrKey: Env.jwt.access_token_serret,
        },
        async (payload: any, done: any) => {
            try {

                const user: UserEntity | null = await userService.findById(payload.id);

                if (!user) return done(null, false);

                done(null, user);

            } catch (error) {
                done(error, false);
            }
        }
    )
);


// // Passport local
passport.use(
    'local',
    new LocalStrategy(
        {
            usernameField: "account",
        },
        async function (account: string, password: string, done: any) {
            try {

                // const user = await userService.findUserByEmail(account);

                // if (!user) return done(null, false);

                // const isMatch = await bcrypt.compare(password, user.password);
                // if (!isMatch)
                //     return done(null, false);

                // return done(null, user);

                const user: UserEntity | null = await userService.findUserByAccount(account, password)
                if (!user) return done(null, false);
                done(null, user);

            } catch (error) {
                done(error, false);
            }
        }
    )
);
