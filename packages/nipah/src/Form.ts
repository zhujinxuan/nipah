interface FormT<A> {
    children? : [A];
}

interface Form extends FormT<Form> {
}


