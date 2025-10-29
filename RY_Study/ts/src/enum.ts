enum EnumRoles {
    ADMIN, GUEST, USER
}

const enum EnumColors {
    black, pink, green
}


interface IRole {
    role: EnumRoles
    color: EnumColors
}

const admin: IRole = {
    role: EnumRoles.ADMIN,
    color: EnumColors.pink
}


console.log(admin);