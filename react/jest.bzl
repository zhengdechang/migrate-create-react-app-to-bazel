load("@npm//jest-cli:index.bzl", "jest", _jest_test = "jest_test")

def jest_test(name, srcs, jest_config, data=None, deps=None, **kwargs):
    data = data or []
    deps = deps or []
    args = [
        "--no-cache",
        "--no-watchman",
        "--ci",
        "--colors",
        "--config",
        "$(execpath %s)" % jest_config
    ]
    for s in srcs:
        args.extend(["--runTestsByPath", "$(execpath %s)" % s])
    _jest_test(
        name = name,
        templated_args = args,
        data = srcs + [jest_config] + data + deps,
        **kwargs
    )
