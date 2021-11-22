import {
  useEffect,
  lazy,
  ComponentType,
  useRef,
  LazyExoticComponent,
} from 'react'

type AnyComponent = ComponentType<any>

interface ModuleWithDefaultExport<TComponent extends AnyComponent> {
  default: TComponent
}

type DefaultImportFactory<TComponent extends AnyComponent> = () => Promise<
  ModuleWithDefaultExport<TComponent>
>

type ModuleWithNamedExport<
  TComponent extends AnyComponent,
  TNamedImport extends string
> = {
  [t in TNamedImport]: TComponent
}

type NamedImportFactory<
  TComponent extends AnyComponent,
  TNamedImport extends string
> = () => Promise<ModuleWithNamedExport<TComponent, TNamedImport>>

interface UseLazyComponentOptions<
  TComponent extends AnyComponent,
  TNamedImport extends string
> {
  preload?: boolean
  namedImport?: keyof ModuleWithNamedExport<TComponent, TNamedImport>
}

export function UseLazyComponent<TComponent extends AnyComponent>(
  factory: DefaultImportFactory<TComponent>,
  options?: { preload?: boolean }
): LazyExoticComponent<TComponent>
export function UseLazyComponent<
  TComponent extends AnyComponent,
  TNamedImport extends string
>(
  factory: NamedImportFactory<TComponent, TNamedImport>,
  options: {
    nameImport: keyof ModuleWithNamedExport<TComponent, TNamedImport>,
    preload?: boolean
  }
): LazyExoticComponent<TComponent>

export function UseLazyComponent<
  TComponent extends AnyComponent,
  TNamedImport extends string
> (
  factory:
    | DefaultImportFactory<TComponent>
    | NamedImportFactory<TComponent, TNamedImport>,
  {
    namedImport,
    preload,
  } : UseLazyComponentOptions<TComponent, TNamedImport> = {
    preload: true
  }
): LazyExoticComponent<TComponent> {
  const lazyRef = useRef<LazyExoticComponent<TComponent>>()

  if (lazyRef.current) {
    return lazyRef.current
  }

  if (namedImport) {
    const namedImportFactory = factory as NamedImportFactory<TComponent, TNamedImport>
    const mappedToDefaultFactory = () =>
      namedImportFactory().then((module) => ({
        default: module[namedImport],
      }))
    lazyRef.current = lazy(() => importWithRetry(mappedToDefaultFactory))
  }
  else {
    const defaultImportFactory = factory as DefaultImportFactory<TComponent>
    lazyRef.current = lazy(() => importWithRetry(defaultImportFactory))
  }

  return lazyRef.current
}

interface RetryAssetDownloadOptions {
  maxAttempts?: number;
  delay?: number;
}

const sleep = (ms: number) => {
  new Promise<void>((resolve) => {
    setTimeout(() => resolve(), ms)
  })
}

async function importWithRetry<T> (
  promiseFactory: () => Promise<T>,
  { maxAttempts = 3, delay = 500 }: RetryAssetDownloadOptions = {}
): Promise<T> {
  let result: T | null = null
  let error: any
  let success = false

  let attempt = 1

  while (!success && attempt <= maxAttempts) {
    if (attempt > 1) {
      await sleep(delay)
    }

    try {
      result = await promiseFactory()
      success = true
    } catch (e: any) {
      if (e.name === 'ChunkLoadError') {
        error = e
        attempt++
      }
      else {
        throw e
      }
    }
  }

  if (success) {
    return result as T
  }
  else {
    throw error
  }
}