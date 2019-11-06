interface FormT<A> {
    children? : A[];
    setChildren<B>(c? : B[]) : FormT<B>;
}

interface Form extends FormT<Form> {
    lift() : FormT<Form>;
}

function fmap<A, B>(a : FormT<A>, f: (src: A) => B) : FormT<B> {
    const {children} = a
    if (children) {
        return a.setChildren(children.map(f))
    }
    return a.setChildren()
}

function cata<A>(a: Form, b : (_:FormT<A>) => A) : A {
    const fb : FormT<A> = fmap<Form, A>(a.lift(), (y : Form) : A => cata<A>(y, b))
    return b(fb)
}
